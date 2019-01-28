import React, {Component} from 'react';
import {
    AsyncStorage,
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    ActivityIndicator
} from 'react-native';
import LoginScreen from "./src/Login.js";
import SignUpScreen from "./src/Signup.js";
import HomeScreen from "./src/Home.js";
import GiftShop from "./src/GiftShop.js";
import Survey from "./src/Survey.js";
import {createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator, DrawerItems} from 'react-navigation';


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
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const DrawerContent = (props) => (
    <View>
        <View
            style={{
                // backgroundColor: '#f50057',
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View style={styles.profileCard}>
                <View style={styles.profileCardContainer}>
                    <Text style={styles.logoLabel}>
                        Billboard
                    </Text>
                    <Text style={styles.labelBarStyle}>
                        پلتفرم تبلیغات دیجیتال
                    </Text>
                </View>
            </View>
        </View>
        <DrawerItems {...props} />
    </View>
);
const AppStack = createStackNavigator({Home: HomeScreen, GiftShop: GiftShop, Survey: Survey});
const AuthStack = createStackNavigator({LogIn: LoginScreen, SignUp: SignUpScreen});
const drw = createDrawerNavigator(
    {
        Home: HomeScreen,
        GiftShop: GiftShop,
        Survey: Survey
    }, {
        drawerPosition: 'right',
        drawerBackgroundColor: '#fcc8f1',
        contentOptions: {
            activeTintColor: '#ea24a3',
            labelStyle: {
                fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
                fontSize: 15,
                fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
                textAlign: 'right',
            },
            itemStyle: {
                flexDirection: 'row-reverse'
            }
        },
        contentComponent: DrawerContent,
    });
export default createAppContainer(
    createSwitchNavigator(
        {
            AuthScreen: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack,
            drw: drw,
        },
        {
            initialRouteName: 'AuthScreen',
            initialRouteName: 'drw',
        })
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileCard: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fc44c5'
    },
    profileCardContainer: {
        margin: 10,
        marginTop: 50,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    labelBarStyle: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'center',
        color: 'white',
    },
    logoLabel: {
        fontFamily: Platform.OS === 'ios' ? "Freestyle Script" : "FREESCPT",
        fontSize: 80,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: 'green',
        textAlign: 'center',
        color: 'white',
    },
});