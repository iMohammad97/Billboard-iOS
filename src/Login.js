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
    ImageBackground, TouchableHighlight, AsyncStorage, TextInput,
} from 'react-native';
import Modal from "react-native-modal";
import RadioButton from 'react-native-radio-button';
export default class Login extends Component<Props> {
    constructor(props) {
        super(props);
        this.loggedIn = this.loggedIn.bind(this);
    };

    state = {
        textInputUsername: 'نام کاربری',
        textInputPassword: 'رمز عبور',
        rememberMe: false,
        alertPopUpModal: false,
    };

    loggedIn() {
        this.props.setLoggInModalVisible(false);
    };

    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <StatusBar barStyle="light-content"/>
                <View style={styles.navigationBar}/>
                <View style={styles.navigationBase}>
                    <View style={styles.navigationBaseItems}>
                        {/*<TouchableOpacity onPress={() => {*/}
                        {/*}} style={styles.TouchableOpacitybound1}>*/}
                        {/*<View style={styles.TouchableOpacityboundFlexLeft}>*/}
                        {/*<Image style={styles.icLanguage}*/}
                        {/*source={require('../images/icLanguage/icLanguage.png')}/>*/}
                        {/*</View>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>

                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <View style={styles.containerFlex}>
                            <Image style={styles.icLogo}
                                   source={require('../images/icLogo/icLogo.png')}/>
                            <Text style={styles.logoLabel}>
                                Billboard
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.containerFlexInput}>
                            <TextInput style={styles.textInputStyle} value={this.state.textInputUsername}/>
                            <View style={{height: 10}}/>
                            <TextInput style={styles.textInputStyle} value={this.state.textInputPassword}/>
                            <View style={{height: 20}}/>
                            <View style={styles.containerRadioInput}>
                                <View style={styles.containerRadioInputFlex}>
                                    <Text style={styles.rememberMeText}>
                                        به خاطر بسپار
                                    </Text>
                                    <RadioButton
                                        animation={'bounceIn'}
                                        isSelected={this.state.rememberMe}
                                        innerColor={'#8BEADF'}
                                        outerColor={'#8BEADF'}
                                        onPress={() => this.setState({rememberMe: !this.state.rememberMe})}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.loginButtonStyle}>
                                <View style={styles.loginButtonFlex}>
                                    <Text style={styles.loginButtonText}>
                                        ورود
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footerContainer}>

                        <TouchableOpacity onPress={this.loggedIn} style={styles.fingerprintButtonContainter}>
                            <Image style={styles.icFingerprint}
                                   source={require('../images/icFingerprint/icFingerprint.png')}/>
                            <Text style={styles.fingerprintButtonText}>
                                ورود با اثر انگشت
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoLabel: {
        width: '100%',
        fontFamily: Platform.OS === 'ios' ? "Roboto" : "Roboto-Bold",
        fontSize: 20,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        borderColor: 'green',
        textAlign: 'center',
        color: 'white',
        marginTop: 0
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
        backgroundColor: '#8BEADF',
    },
    icFingerprint: {
        width: 60,
        height: 60,
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
        color: '#433E53',
    },
    textInputStyle: {
        width: '60%',
        borderRadius: 0,
        height: 40,
        backgroundColor: 'transparent',
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 12,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
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
        height: '100%',
        backgroundColor: '#433E53',
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
        width: 200,
        height: 200
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    navigationBar: {
        backgroundColor: '#433E53',
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
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    TouchableOpacityboundLeft: {
        width: 60,
        height: 28,
        marginLeft: 10,
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
        backgroundColor: '#433E53',
        width: '100%',
        height: 50, //109
        shadowColor: "rgba(67, 82, 87, 0.4)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0,
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
