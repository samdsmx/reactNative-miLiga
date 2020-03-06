import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { ListItem } from "react-native-elements";

export class Teams extends Component{
    render(){
        return(
            this.props.equipos.map(equipo =>
                (
                <ListItem
                    leftAvatar={{ source: { uri: equipo.logo } }}
                    key={equipo.id}
                    title={equipo.nombre}
                    subtitle={
                        <View style={[styles.circle, 
                            equipo.estado ? styles.active : styles.inactive
                        ]} />
                        // String(equipo.estado)
                    }
                    bottomDivider
                    onPress={ ()=> this.props.onSelectTeam(equipo) }
                />
                )
            )
        );
    }
}

const styles = StyleSheet.create({
    circle: {
        width: 60,
        height: 10,
        marginTop: 5,
        marginLeft: 12,
        borderRadius: 50
    },
    active: {
        backgroundColor: "green"
    },
    inactive: {
        backgroundColor: "gray"
    }
});