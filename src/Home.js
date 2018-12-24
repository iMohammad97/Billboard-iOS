import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button, Image,
    StatusBar,
    StyleSheet, Text, TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import Modal from "react-native-modal";

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.loadUser();
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
        id: '',
    };

    static navigationOptions = {
        header: null,
        title: 'Billboard',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./images/icHome/icHome.png')}
                style={[styles.sideIcon, {tintColor: tintColor}]}
            />
        ),
    };


    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <StatusBar hidden/>
                <View style={styles.navigationBar}/>
                <View style={styles.navigationBase}>
                    <View style={styles.navigationBaseItems}>
                        <TouchableOpacity onPress={this.signOutAsync}
                                          style={styles.TouchableOpacityboundLeft}>
                            <View style={styles.TouchableOpacityboundFlexLeft}>
                                <Image style={styles.icLogout}
                                       source={require('./images/icLougout/icLougout.png')}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.logoLabel}>
                            Billboard
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}
                                          style={styles.TouchableOpacityboundLeft}>
                            <View style={styles.TouchableOpacityboundFlexLeft}>
                                <Image style={styles.icSidebar}
                                       source={require('./images/icSidebar/icSidebar.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileCardContainer}>
                            <View style={styles.imageRow}>
                                <Image
                                    source={require('./images/profile/profile.jpeg')}
                                    style={styles.profilePicture}
                                />
                            </View>
                            <View style={styles.infoColumn}>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoData}>
                                        {this.state.name}
                                    </Text>
                                    <View style={styles.infoLabel}>
                                        <Image
                                            source={require('./images/icProfile/icProfile.png')}
                                            style={styles.infoIcon}
                                        />
                                    </View>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoData}>
                                        {this.state.role}
                                    </Text>
                                    <View style={styles.infoLabel}>
                                        <Image
                                            source={require('./images/icRole/icRole.png')}
                                            style={styles.infoIcon}
                                        />
                                    </View>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoData}>
                                        {this.state.credit}
                                    </Text>
                                    <View style={styles.infoLabel}>
                                        <Image
                                            source={require('./images/icCredit/icCredit.png')}
                                            style={styles.infoIcon}
                                        />
                                    </View>
                                </View>
                            </View>
                            {/*<View style={styles.infoRow}>*/}
                                {/*<Text style={styles.infoData}>*/}
                                    {/*{this.state.email}*/}
                                {/*</Text>*/}
                                {/*<Text style={styles.infoLabel}>*/}
                                    {/*ایمیل:*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    loadUser = async () => {
        try {
            this.setState({credit: await AsyncStorage.getItem('credit')});
            this.setState({email: await AsyncStorage.getItem('email')});
            this.setState({name: await AsyncStorage.getItem('name')});
            this.setState({role: await AsyncStorage.getItem('role')});
            this.setState({status: await AsyncStorage.getItem('status')});
            this.setState({id: await AsyncStorage.getItem('id')});
        } catch (error) {
            // Error retrieving data
        }
    };

    signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#ea24a3',
        borderWidth: 2,

    },
    infoIcon: {
        width: 30,
        height: 30
    },
    sideIcon: {
        width: 20,
        height: 20
    },
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
    infoColumn: {
        width: '50%',
        // borderWidth: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    imageRow: {
        width: '50%',
        // borderWidth: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
    },
    profileCard: {
        width: '100%',
        height: 150,
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
        // marginRight: 10,
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