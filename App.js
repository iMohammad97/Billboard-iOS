import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image} from 'react-native';
import Modal from "react-native-modal";
import Login from "./src/Login.js";
import Signup from "./src/Signup.js";
import HomeScreen from "./src/Home.js";
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    };

    state = {
        loginView: false,
        signupView: true,
        userInfo: '',
        // API fetched data states:
        credit: '',
        email: '',
        name: '',
        role: '',
        status: '',
        serializedUser: '',
    };

    setLoggInModalVisible = inf => {
        this.setState({loginView: false});
        this.setState({userInfo: inf});
        this.myFunction(inf)
    };
    setSignedUpModalVisible = inf => {
        this.setState({signupView: false});
        this.setState({userInfo: inf});
        this.myFunction(inf)
    };
    myFunction = (userInfo) => {
        let str = userInfo;
        let arr = str.split("-");
        this.setState({credit: arr[0]});
        this.setState({email: arr[1]});
        this.setState({name: arr[2]});
        this.setState({role: arr[3]});
        this.setState({status: arr[4]});
    };

    render() {
        return (

        );
    }
}


const AppStack = createStackNavigator({ Home: HomeScreen});
const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });

export default createAppContainer(createSwitchNavigator(
    {
        AuthScreen: LoginScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthScreen',
    }
));
