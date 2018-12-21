import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity, Image} from 'react-native';
import Modal from "react-native-modal";
import Login from "./src/Login.js";
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    };

    state = {
        loginView: true,
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
            <View style={{height: '100%', width: '100%'}}>
                <StatusBar hidden/>
                <View style={styles.navigationBar}/>
                <View style={styles.navigationBase}>
                    <View style={styles.navigationBaseItems}>
                        <TouchableOpacity onPress={() => this.setState({loginView: true})}
                                          style={styles.TouchableOpacityboundLeft}>
                            <View style={styles.TouchableOpacityboundFlexLeft}>
                                <Image style={styles.icLogout}
                                       source={require('./src/images/icLougout/icLougout.png')}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.logoLabel}>
                            Billboard
                        </Text>
                        <TouchableOpacity onPress={() => this.setState({sidebarModal: true})}
                                          style={styles.TouchableOpacityboundLeft}>
                            <View style={styles.TouchableOpacityboundFlexLeft}>
                                <Image style={styles.icSidebar}
                                       source={require('./src/images/icSidebar/icSidebar.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileCardContainer}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoData}>
                                    {this.state.name}
                                </Text>
                                <Text style={styles.infoLabel}>
                                    نام:
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoData}>
                                    {this.state.role}
                                </Text>
                                <Text style={styles.infoLabel}>
                                    سمت:
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoData}>
                                    {this.state.credit}
                                </Text>
                                <Text style={styles.infoLabel}>
                                    اعتبار:
                                </Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoData}>
                                    {this.state.email}
                                </Text>
                                <Text style={styles.infoLabel}>
                                    ایمیل:
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <Modal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    hideModalContentWhileAnimating={true}
                    // onBackdropPress={() => this.setState({loginView: false})}
                    isVisible={this.state.loginView}
                    style={{margin: 0}}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Login setLoggInModalVisible={this.setLoggInModalVisible}/>
                </Modal>
                {/*<Text style={styles.instructions}>{instructions}</Text>*/}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    infoData: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        textAlign: 'right',
        paddingRight: 5,
        color: '#ea24a3',
    },
    infoLabel: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        color: '#ea24a3',
    },
    infoRow: {
        height: 30,
        // borderWidth: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    profileCardContainer: {
        margin: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
    },
    profileCard: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        backgroundColor: '#fcc8f1'
    },
    mainContainer: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    logoLabel: {
        // width: '100%',
        fontFamily: Platform.OS === 'ios' ? "Freestyle Script" : "FREESCPT",
        fontSize: 35,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        borderColor: 'green',
        textAlign: 'center',
        color: 'white',
        // marginTop: 10
    },
    icBack: {
        height: 20,
        width: 20,
        marginRight: 10,
    },
    backButtonText: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        textAlign: 'right',
        color: '#8BEADF',
        marginRight: 2
    },
    settingsModalTopBarFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    settingsModalTopBarContainer: {
        width: '100%',
        height: 60,
    },
    settingsContainerModal: {
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40,
        marginBottom: 40,
        backgroundColor: '#7b7491'
    },
    settingsContainer: {
        height: '100%',
        width: '100%',
    },
    settingsContainerFlex: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    webViewErrorContainer: {
        aspectRatio: 1,
        backgroundColor: '#7b7491',
        borderRadius: 5
    },
    webViewContainer: {
        height: '100%',
        width: '100%'
    },
    sidebarTopBannerLabel: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 23,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        color: '#8BEADF',
    },
    sidebarTopBannerImage: {
        width: 150,
        height: 150
    },
    sidebarTopBannerFlex: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebarItemLabelText: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanRegular",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        textAlign: 'right',
        color: '#8BEADF',
        paddingRight: 10
    },
    icSidebarItem: {
        width: 30,
        height: 30,
    },
    sidebarItemFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sidebarItemContainer: {
        maxWidth: '100%',
        height: 55,
        borderBottomWidth: 1,
        borderWidth: 0,
        borderColor: '#8BEADF',
        borderRadius: 0,
    },
    sidebarTopBannerContainer: {
        width: '100%',
        height: 220,
        backgroundColor: 'transparent'
    },
    sidebarModalStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#433E53',
        paddingRight: 20,
        paddingLeft: 10
    },
    icSidebar: {
        width: 30,
        height: 30
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    navigationBar: {
        backgroundColor: '#fc44c5',
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TouchableOpacityboundLeft: {
        width: 50,
        height: 50,
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
    icWrite: {
        width: 18,
        height: 18,
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
        backgroundColor: '#fc44c5',
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

    icLogout: {
        width: 30,
        height: 30
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

