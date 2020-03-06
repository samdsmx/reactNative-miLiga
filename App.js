import React from "react";
import { Alert, Vibration, View } from "react-native";
import { Button } from "react-native-elements";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { Team } from "./components/team"
import { Teams } from "./components/teams"

const equipos = [
  {
    id: "1",
    nombre: "Equipo 1",
    logo: "https://via.placeholder.com/600x300/77b300/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [{ nombre: "Hugo" }]
  },
  {
    id: "2",
    nombre: "Equipo 2",
    logo: "https://via.placeholder.com/600x300/2eb8b8/ffffff?text=Logo+equipo",
    estado: false,
    jugadores: [{ nombre: "Paco" }, { nombre: "Luis" }]
  },
  {
    id: "3",
    nombre: "Equipo 3",
    logo: "https://via.placeholder.com/600x300/0040ff/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [
      { nombre: "Susana" },
      { nombre: "Carolina" },
      { nombre: "Marina" }
    ]
  },
  {
    id: "4",
    nombre: "Equipo 4",
    logo: "https://via.placeholder.com/600x300/ff00bf/ffffff?text=Logo+equipo",
    estado: false,
    jugadores: []
  },
  {
    id: "5",
    nombre: "Equipo 5",
    logo: "https://via.placeholder.com/600x300/D2B48C/ffffff?text=Logo+equipo",
    estado: true,
    jugadores: [{ nombre: "Gabriela" }, { nombre: "Alonso" }]
  }
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamVisible: false,
      selectedTeam: {},
      offline: true,
      equipos: equipos
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(connectionInfo => {
      if (connectionInfo.type == "none" || connectionInfo.type == "unknown") {
        Alert.alert("Dispositivo sin conexion a internet");
      } else {
        this.setState({
          offline: !connectionInfo.isConnected
        });
        Alert.alert("Conectado a Internet via " + connectionInfo.type);
      }
    });
  }

  displayNetworkInfo() {
    NetInfo.fetch().then(connectionInfo => {
      Alert.alert("Tipo de conexion " + connectionInfo.type
        + " EffectiveConnectionType: " + connectionInfo.details?.cellularGeneration);
      console.log(connectionInfo);
    });
  }

  toggleTeam() {
    // Vibration.vibrate([10, 500, 250, 1000, 250, 500]);
    Vibration.vibrate(10);
    this.setState({
      teamVisible: !this.state.teamVisible
    });
  }

  displayTeam(equipo) {
    this.setState({
      selectedTeam: equipo
    });
    this.toggleTeam();
  }

  getData() {
    NetInfo.fetch().then(connectionInfo => {
      if (connectionInfo.isConnected) {
        // Alert.alert("Datos enviados");
        this.getRemoteTeams();
      } else {
        Alert.alert("Verifica tu conexion");
      }
    });
  }

  async getRemoteTeams() {
    let response = await fetch('https://api-mi-liga.now.sh/api/equipos');
    let responseJSON = await response.json();
    this.setState({
      equipos: responseJSON
    });

  }

  render() {
    return (
      <View style={{ marginTop: 22, flex: 1, backgroundColor: '#9FA8D1' }}>
        <Teams equipos={this.state.equipos} onSelectTeam={(equipo) => this.displayTeam(equipo)} />
        <Team
          visible={this.state.teamVisible}
          equipo={this.state.selectedTeam}
          onToggleTeam={() => this.toggleTeam()} />
        <Button
          buttonStyle={{ margin: 20, backgroundColor: "#4CAF50" }}
          icon={{ name: "ios-wifi", type: "ionicon" }}
          title="Mostrar informacion de red"
          onPress={() => this.displayNetworkInfo()} />
        <Button
          buttonStyle={{ margin: 20, backgroundColor: "#17a2b8" }}
          icon={{ name: "ios-send", type: "ionicon" }}
          title="Enviar datos"
          disabled={this.state.offline}
          onPress={() => this.getData()} />
      </View>
    );
  }
}

