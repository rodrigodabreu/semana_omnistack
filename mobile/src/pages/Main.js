import React, { useState, useEffect }from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

function Main( { navigation }) { // vem de forma automatica para todas as páginas da aplicação
    const [ currentRegion, setCurrentRegion ] = useState(null);
    const [ devs, setDevs ] = useState([]);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({ //pegando a posição do usuario
                    enableHighAccuracy: true, //ativando a precisão do GPS
                });

                const {latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04, //zoom dentro do mapa
                    longitudeDelta: 0.04,
                })

            }
        }
        loadInitialPosition();
    },[]);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;
         
            const response = await api.get('/search', {
                params: {
                    latitude,
                    longitude,
                    techs: ''
                }
            });
    
            setDevs(response.data.devs);            
    }


    function handleRegionChanged(region) { //definindo a nova localizacao com base no mapa
        setCurrentRegion(region);
    }

    if (!currentRegion) {
        return null; //setando como null para não mostrar o mapa caso o usuário não tenha autorizado a localização
    }

    return (
        <>
        <MapView 
        onRegionChangeComplete={ handleRegionChanged} 
        initialRegion = {currentRegion} 
        style={styles.map}
        >
            {devs.map( dev => (
                <Marker 
                key={dev._id}
                coordinate= {{ 
                    latitude: devs.location.coordinates[1], 
                    longitude: devs.location.coordinates[0]
                    }}
            >
                <Image 
                    style= { styles.avatar } 
                    source= {{ uri:  dev.avatar_url }}
                />
                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: dev.github_username })
                }}>
                    <View style= {styles.callout}> 
                        <Text style= {styles.devName}>{dev.name}</Text>
                        <Text style= {styles.devBio}>{dev.bio}</Text>
                        <Text style= {styles.devTechs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>
            ))}
        </MapView>
        <View style={styles.searchForm}>
            <TextInput 
                style= {styles.searInput} 
                placeholder= "Buscar devs por techs ..."
                placeholderTextColor= "#999"
                autoCapitalize="words" //colocando a primeira letra em caixa alta
                autoCorrect={ false }
            />
            <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                <MaterialIcons name="my-location" size={20} color= "#FFF"/>
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5,
    },
    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    searInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    }
})

export default Main;