import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import LoginScreen from "./src/Login.js";
import SignUpScreen from "./src/Signup.js";
import HomeScreen from "./src/Home.js";
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';



class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const user = await AsyncStorage.getItem('status');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation.navigate((user === "OK") ? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
const AppStack = createStackNavigator({ Home: HomeScreen});
const AuthStack = createStackNavigator({ LogIn: LoginScreen, SignUp: SignUpScreen });

export default createAppContainer(createSwitchNavigator(
    {
        AuthScreen: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthScreen',
    }
));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});