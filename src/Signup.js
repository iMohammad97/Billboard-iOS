import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    ImageBackground, TouchableHighlight, AsyncStorage, TextInput, Alert,
} from 'react-native';
import Modal from "react-native-modal";
import RadioButton from 'react-native-radio-button';
const color1 = '#203b61';
const color2 = '#f3f4f7';
const color3 = '#ffffff';
const color4 = '#f97173';

export default class SignUpScreen extends Component<Props> {
    constructor(props) {
        super(props);
    };
    handlePress = async () => {
        fetch('http://127.0.0.1:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"name": this.state.textInputName, "email": this.state.textInputUsername, "password": this.state.textInputPassword})
        })
            .then((response) =>  {
                // console.log('response', response);
                return response.json();
            })
            .then((responseJson) => {
                this.setState({email: responseJson["user"]["email"]});
                this.setState({name: responseJson["user"]["name"]});
                this.setState({credit: String(responseJson["user"]["credit"])});
                this.setState({role: responseJson["user"]["role"]});
                this.setState({id: String(responseJson["user"]["id"])});
                this.setState({status: responseJson["status"]});
                // Alert.alert("Author name at 0th index:  " + responseJson["status"]);
                if (this.state.status === "OK") {
                    this.handleLogin()
                    // Alert.alert("Author name at 0th index:  " + responseJson["status"]);
                } else {
                    let err = this.state.status;
                    switch (err) {
                        case "password incorrect":
                            this.setState({errorConsole: "خطا:‌ رمز عبور اشتباه است"});
                            break;
                        case "user not found":
                            this.setState({errorConsole: "خطا: نام کاربری یافت نشد"});
                            break;
                        default:
                            this.setState({errorConsole: "خطا: عدم ارتباط با سرور"});
                    };
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    state = {
        // Text inputs :
        textInputUsername: "",
        textInputPassword: "",
        textInputName: "",
        // API fetched data states:
        credit: '',
        email: '',
        name: '',
        role: '',
        id: '',
        status: '',
        serializedUser: '',
        // Screen parts :
        errorConsole: '',
        rememberMe: false,
        alertPopUpModal: false,
    };
    static navigationOptions = {
        header: null,
    };
    handleLogin = async () => {
        fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({"email": this.state.textInputUsername, "password": this.state.textInputPassword})
        })
            .then((response) =>  {
                // console.log('response', response);
                return response.json();
            })
            .then((responseJson) => {
                // console.log('json', responseJson);
                this.setState({email: responseJson["user"]["email"]});
                this.setState({name: responseJson["user"]["name"]});
                this.setState({credit: String(responseJson["user"]["credit"])});
                this.setState({role: responseJson["user"]["role"]});
                this.setState({id: String(responseJson["user"]["id"])});
                this.setState({status: responseJson["status"]});
                // Alert.alert("Author name at 0th index:  " + responseJson["status"]);
                if (this.state.status === "OK") {
                    this.signUpAndSignInAsync()
                    // Alert.alert("Author name at 0th index:  " + responseJson["status"]);
                } else {
                    let err = this.state.status;
                    switch (err) {
                        case "password incorrect":
                            this.setState({errorConsole: "خطا:‌ رمز عبور اشتباه است"});
                            break;
                        case "user not found":
                            this.setState({errorConsole: "خطا    : نام کاربری یافت نشد"});
                            break;
                        default:
                            this.setState({errorConsole: "خطا: عدم ارتباط با سرور"});
                    }
                    ;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    signUpAndSignInAsync = async () => {
        await AsyncStorage.setItem('credit', this.state.credit);
        await AsyncStorage.setItem('email', this.state.email);
        await AsyncStorage.setItem('name', this.state.name);
        await AsyncStorage.setItem('role', this.state.role);
        await AsyncStorage.setItem('status', this.state.status);
        await AsyncStorage.setItem('id', this.state.id);

        this.props.navigation.navigate('App');
    };

    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.navigationBar}/>
                <View style={styles.navigationBase}>
                    <View style={styles.navigationBaseItems}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                          style={styles.TouchableOpacityboundLeft}>
                            <Image style={styles.icPrevious}
                                   source={require('./images/icPrevious/icPrevious.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <View style={styles.containerFlex}>
                            <Image style={styles.icLogo}
                                   source={require('./images/icLogo/icLogo.png')}/>
                            <Text style={styles.logoLabel}>
                                Billboard
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.containerFlexInput}>
                            <Text style={styles.errorConsoleStyle}>
                                {this.state.errorConsole}
                            </Text>
                            <TextInput style={styles.textInputStyle} placeholder="نام"
                                       autoCapitalize='none'
                                       autoCorrect={false}
                                       placeholderTextColor={color2}
                                       onChangeText={(textInputName) => this.setState({textInputName})}/>
                            <View style={{height: 10}}/>
                            <TextInput style={styles.textInputStyle} placeholder="ایمیل"
                                       autoCapitalize='none'
                                       placeholderTextColor={color2}
                                       autoCorrect={false}
                                       onChangeText={(textInputUsername) => this.setState({textInputUsername})}/>
                            <View style={{height: 10}}/>
                            <TextInput style={styles.textInputStyle} placeholder="رمز عبور"
                                       autoCapitalize='none'
                                       autoCorrect={false}
                                       placeholderTextColor={color2}
                                       secureTextEntry={true}
                                       onChangeText={(textInputPassword) => this.setState({textInputPassword})}/>
                            <View style={{height: 20}}/>
                            <View style={styles.containerRadioInput}>
                                <View style={styles.containerRadioInputFlex}>
                                    <Text style={styles.rememberMeText}>
                                        قبول قوانین
                                    </Text>
                                    <RadioButton
                                        animation={'bounceIn'}
                                        isSelected={this.state.rememberMe}
                                        innerColor={color4}
                                        outerColor={color4}
                                        onPress={() => this.setState({rememberMe: !this.state.rememberMe})}
                                    />
                                </View>
                            </View>


                            <TouchableOpacity style={styles.loginButtonStyle}
                                              onPress={this.handlePress}>
                                <View style={styles.loginButtonFlex}>
                                    <Text style={styles.loginButtonText}>
                                        ثبت نام
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/*<View style={styles.footerContainer}>*/}

                        {/*<TouchableOpacity onPress={this.signedUp} style={styles.fingerprintButtonContainter}>*/}
                            {/*<Image style={styles.icFingerprint}*/}
                                   {/*source={require('./images/icFingerprint/icFingerprint.png')}/>*/}
                            {/*<Text style={styles.fingerprintButtonText}>*/}
                                {/*ورود با اثر انگشت*/}
                            {/*</Text>*/}
                        {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoLabel: {
        width: '100%',
        fontFamily: Platform.OS === 'ios' ? "Freestyle Script" : "FREESCPT",
        fontSize: 40,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: 'green',
        textAlign: 'center',
        color: color4,
        marginTop: 10
    },
    alertPopUpWindow: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
    },
    fingerprintButtonContainter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    loginButtonStyle: {
        width: '60%',
        height: 40,
        borderRadius: 5,
        marginTop: 10,
        backgroundColor: color4,
    },
    icFingerprint: {
        width: 60,
        height: 60,
    },
    icPrevious: {
        width: 30,
        height: 30
    },
    fingerprintButtonText: {
        height: '100%',
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 10,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: 'green',
        textAlign: 'center',
        color: 'white',
        marginTop: 10
    },
    loginButtonFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButtonText: {
        height: '100%',
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        borderColor: '#8BEADF',
        textAlign: 'right',
        color: color3,
    },
    textInputStyle: {
        width: '60%',
        borderRadius: 0,
        height: 40,
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: color4,
        textAlign: 'right',
        color: 'white',
        paddingRight: 5,
        borderBottomWidth: 2,
        borderWidth: 0
    },
    errorConsoleStyle: {
        width: '60%',
        borderRadius: 0,
        height: 40,
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        borderColor: '#8BEADF',
        textAlign: 'right',
        color: 'white',
        paddingRight: 5,
        borderBottomWidth: 2,
        borderWidth: 0
    },
    rememberMeText: {
        maxHeight: '100%',
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 15,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        textAlign: 'right',
        color: 'white',
        paddingRight: 7
    },
    footerContainer: {
        width: '100%',
        height: '30%',
    },
    inputContainer: {
        width: '100%',
        height: '40%',
    },
    mainContainer: {
        width: '100%',
        height: '90%',
        backgroundColor: color1,
    },
    containerFlex: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    containerFlexInput: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerRadioInput: {
        width: '60%',
        height: 30,
    },
    containerRadioInputFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        width: '100%',
        height: '30%',
    },
    icLogo: {
        width: 150,
        height: 150
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    navigationBar: {
        backgroundColor: color1,
        width: '100%',
        height: 30,
    },

    TouchableOpacitybound1: {
        width: 28,
        height: 28,
        marginRight: 4
    },
    navigationBaseItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
        paddingTop: 10
    },
    TouchableOpacityboundLeft: {
        width: 60,
        height: '100%',
        marginLeft: 0,
    },
    TouchableOpacityboundFlexLeft: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TouchableOpacityboundFlexRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icLanguage: {
        width: 25,
        height: 25,
        backgroundColor: 'transparent',
    },

    icSettings: {
        width: 18,
        height: 18,
        backgroundColor: 'transparent',
    },
    headerRightContainer: {
        width: 60,
        height: 28,
        marginRight: 10,
    },
    headerRightFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navigationBase: {
        backgroundColor: color1,
        width: '100%',
        height: "10%", //109
    },
    navigationBaseDown: {
        backgroundColor: 'rgb(255, 255, 255)',
        width: '100%',
        height: 70, //109
        shadowColor: "rgba(67, 82, 87, 0.4)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
    },

    icMoallemLogo: {
        width: 109,
        height: 15
    },
    todayButton: {
        maxWidth: 60,
        paddingLeft: 4,
        paddingRight: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'transparent',
        fontFamily: "IRANYekan",
        fontSize: 17,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 28,
        letterSpacing: 0,
        textAlign: "center",
        color: 'white',
    },
});
