import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Context/authContext'
import {
    Text,
    View
} from 'native-base';
import {
    StyleSheet,
    TextInput,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import { showMessage, hideMessage } from "react-native-flash-message";
import WifiManager from "react-native-wifi-reborn";
import { getMacAddress } from 'react-native-device-info';
import DeviceInfo from 'react-native-device-info';
​
​
const App = ({ navigation }) => {
    const [pin, setPin] = useState('')
    const [MAC, setMAC] = useState('')
    const [SSID, setSSID] = useState('')
    const [loader, setLoader] = useState(false)
    const authContext = useContext(AuthContext)
    console.log(SSID, MAC)
    
    const Login = async () => {
        setLoader(true)
​
        try {
            var currentdate = new Date();
            const user = await firestore().collection('auth').doc(pin).get();
​
            if (user._data === undefined || SSID === '') {
                throw "No data has found"
            }
​
            const ssids = await firestore().collection('ssid').get();
​
            if (ssids._docs !== undefined) {
​
                let isMatched = ssids._docs.findIndex(value => value._data.ssid === SSID);
                // console.log(isMatched, "<===================",user._data.mac, MAC);
​
                if (isMatched >= 1 && user._data.mac === MAC) {
​
                    const setAttendance = {
                        ...user._data,
                        ssid: SSID,
                        checkin: currentdate.getTime(),
                    }
​
                    var attendanceKey = currentdate.getDate() + " "
                                        + (currentdate.getMonth() + 1) + " "
                                        + currentdate.getFullYear() + " " + user._data.email;
​
                    const userDocument = await firestore().collection('attendance').doc(attendanceKey).get();
                    
​
                    if (userDocument._data === undefined) {
​
                        const setData = firestore().collection('attendance').doc(attendanceKey).set(setAttendance)
​
                        if (setData !== "") {
                            setLoader(false)
                            showMessage({
                                message: "Your attendance has marked successfully.",
                                description: "Dipixels",
                                type: "default",
                                backgroundColor: "#036e64",
                                color: "white",
                                icon: "success"
                            });
                            authContext.setAuth(setAttendance)
                            setPin("")
                            navigation.navigate('Home')
                        }
​
                    }
​
                    else {
                        setLoader(false)
                        showMessage({
                            message: "Your attendance has already marked for today. ",
                            description: "Dipixels",
                            type: "default",
                            backgroundColor: "#bd0d00",
                            color: "white",
                            icon: "success"
                        });
                        authContext.setAuth(setAttendance)
                        setPin("")
                        navigation.navigate('Home')
​
                    }
​
                } 
                
                else {
                    setLoader(false)
                            showMessage({
                                message: "Your Wifi or Device does not recognise for your Authentication.",
                                description: "Dipixels",
                                type: "default",
                                backgroundColor: "#bd0d00",
                                color: "white",
                                icon: "success"
                            });
                }
​
            }
            else {
                
                setLoader(false)
                showMessage({
                    message: "You have to connect with Dipixels wifi to mark your attendance.",
                    description: "Dipixels",
                    type: "default",
                    backgroundColor: "#bd0d00",
                    color: "white",
                    icon: "success"
                });
            }
​
        }
​
        catch (err) {
​
            setLoader(false)
            showMessage({
                message: err,
                description: "Dipixels",
                type: "default",
                backgroundColor: "#bd0d00",
                color: "white",
                icon: "success"
            });
        }
    }
​
​
    useEffect(() => {
​
        WifiManager.getBSSID().then(data => setSSID(data));
​
        DeviceInfo.getMacAddress().then((mac) => setMAC(mac));
​
    }, [])
    return (
        <View>
            <View style={styles.backgroundContainer}>
                <Text style={styles.logoStyle}>
                    DiPixels
                </Text>
            </View>
​
            <View style={styles.innerContainer}>
​
                <View>
                    <Text style={styles.loginHeader}>Enter Your Employee PIN number to login at Dipixels</Text>
                    <Text style={styles.loginMAC}>My MAC: {MAC}</Text>
                </View>
​
                <View style={styles.innerContainer1}>
                    <Text style={styles.innerText}>Employee PIN Number</Text>
                    
                    <TextInput style={styles.innerTextField}
                        placeholder='Your PIN'
                        secureTextEntry={true}
                        value={pin}
                        keyboardType={"numeric"}
                        onChangeText={(e) => setPin(e)} />
                </View>
​
                <View>
​
                    {
                        loader ?
​
                            <ActivityIndicator style={{marginTop:30}} size="large" color="#60A5A5" />
​
                            :
​
                            <TouchableOpacity style={styles.loginButton} onPress={() => { Login();}}>
                                <Text style={styles.loginText}>Checkin</Text>
                            </TouchableOpacity>
                    }
​
​
                </View>
​
            </View>
        </View>
    );
};
​
const styles = StyleSheet.create({
    backgroundContainer: {
        backgroundColor: '#019386',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoStyle: {
        color: 'white',
        fontSize: 25,
    },
    loginMAC:{
        fontSize:10,
        color: '#019386'
    },
    innerContainer: {
        backgroundColor: 'white',
        height: '90%',
        top: -20,
        borderRadius: 25,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    innerTextField: {
        width: 250,
        height: 45,
        fontSize: 13,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        color: 'gray'
    },
    innerText: {
        fontSize: 13,
    },
    innerContainer1: {
        marginBottom: 15
    },
    loginButton: {
        backgroundColor: '#019386',
        width: 250,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 5
    },
    loginText: {
        fontSize: 14,
        color: 'white'
    },
    loginHeader: {
        fontSize: 13,
        marginBottom: 100,
        marginTop: 100,
        width: 250,
        textAlign: 'center'
    },
});
​
export default App;
Colla