import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button, Image,
    StatusBar,
    StyleSheet, Text, TouchableOpacity,
    View,
    Platform,
    Alert,
    ScrollView,
} from 'react-native';
import Modal from "react-native-modal";
import {DrawerActions} from "react-navigation";
const color1 = '#203b61';
const color2 = '#f3f4f7';
const color3 = '#ffffff';
const color4 = '#f97173';

export default class SurveyFill extends React.Component {
    constructor(props) {
        super(props);
        this.loadUser();
        this.loadSurvey();
        // this.getSurveyItems();
    };

    state = {
        loginView: false,
        signupView: true,
        giftCardCode: false,
        giftCardFail: false,
        userInfo: '',
        // API fetched data states:
        credit: '',
        email: '',
        name: '',
        role: '',
        status: '',
        userId: '',
        // API fetched data GIFTHISTORY
        giftCode: '',
        giftUser_id: '',
        gift_id: '',
        date: '',
        description: '',
        giftDBId: '',
        giftHistoryStatus: '',
        //api url
    };

    static navigationOptions = {
        header: null,
        title: 'Billboard',
        drawerLabel: 'نظر سنجی',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('./images/icSurvey/icSurvey.png')}
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
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                                          style={styles.TouchableOpacityboundLeft}>
                            <View style={styles.TouchableOpacityboundFlexLeft}>
                                <Image style={styles.icLogout}
                                       source={require('./images/icPrevious/icPreviousWhite.png')}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.logoLabel}>
                            Billboard
                        </Text>
                        <TouchableOpacity
                                          style={styles.TouchableOpacityboundLeft1}>
                            <View style={styles.TouchableOpacityboundFlexLeft}>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileCardContainer}>
                            <View style={styles.infoColumn}>
                                <TouchableOpacity style={styles.refreshButton}
                                                  onPress={() => this.infoUpdate()}
                                >
                                    <Image
                                        source={require('./images/icRefresh/icRefresh.png')}
                                        style={styles.refreshIcon}
                                    />
                                </TouchableOpacity>
                                <View style={styles.infoRowGiftShopBar}>
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
                                <View style={styles.infoRowGiftShopBar}>
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
                    <ScrollView style={styles.mainContainerScrollView} showsVerticalScrollIndicator={false}>
                        <View style={styles.giftHistoryCard}>
                            <View style={styles.giftHistoryCardBarContainer}>
                                <TouchableOpacity style={styles.refreshButton}
                                                  onPress={() => this.loadGiftShop()}
                                >
                                    <Image
                                        source={require('./images/icRefresh/icRefresh.png')}
                                        style={styles.refreshIcon}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.infoLabel1}>
                                    {this.state.srvyDescription}
                                </Text>
                            </View>
                            <View style={styles.giftHistoryCardContainer2}>
                                {this.state.surveyItemListArr}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    };

    infoUpdate = async () => {
        fetch('http://127.0.0.1:5000/api/getUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({"user_id": await AsyncStorage.getItem('id')})
        })
            .then((response) => {
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
                    this.signInAsyncUpdate()
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
                    }
                    ;
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    signInAsyncUpdate = async () => {
        await AsyncStorage.setItem('credit', this.state.credit);
        await AsyncStorage.setItem('email', this.state.email);
        await AsyncStorage.setItem('name', this.state.name);
        await AsyncStorage.setItem('role', this.state.role);
        await AsyncStorage.setItem('status', this.state.status);
        await AsyncStorage.setItem('id', this.state.id);
    };

    setModalResultVisible = (visible, giftshop) => {
        this.setState({giftDescription: giftshop.description});
        this.setState({giftCost: giftshop.cost});
        this.setState({giftCode: giftshop.code});
        this.setState({giftCardCode: visible});
    };
    setModalResultFailVisible = (visible) => {
        this.setState({giftCardFail: visible});
    };


    loadUser = async () => {
        try {
            this.setState({credit: await AsyncStorage.getItem('credit')});
            this.setState({email: await AsyncStorage.getItem('email')});
            this.setState({name: await AsyncStorage.getItem('name')});
            this.setState({role: await AsyncStorage.getItem('role')});
            this.setState({status: await AsyncStorage.getItem('status')});
            this.setState({userId: await AsyncStorage.getItem('id')});
        } catch (error) {
            // Error retrieving data
        }
    };
    getSurveyItems = async () => {

        fetch(this.state.srvyAPI, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                // console.log('response', response);
                return response.json();
            })
            .then((responseJson) => {
                // console.log('json', responseJson);
                if (responseJson.status === 'OK') {
                    // console.log('rgiiidsbiuwebviuwebiuwebcwebiiiid', this.state.srvyAPI);
                    // console.log('rgiiidsbiuwebviuwebiuwebcwebiiiid', responseJson.survey.questions);

                    const surveyItemListArrr = responseJson.survey.questions.map(surveyItem => (
                        <View key={surveyItem.id} style={styles.giftCardShop}>
                            <View style={styles.giftCardShopContainer}>
                                <Text style={styles.giftCardShopLabel}>
                                    {surveyItem.context}
                                </Text>
                                { surveyItem.items.map(item => {
                                    return (
                                        <View key={item.id} style={styles.infoRow}>

                                            <Text style={styles.giftCardCode}>
                                                {item.context}
                                            </Text>
                                            <View style={styles.infoLabelShop}>
                                                <Image
                                                    source={require('./images/icCreditWhite/icCreditWhite.png')}
                                                    style={styles.infoIcon}
                                                />
                                            </View>
                                        </View>
                                    );
                                })
                                }
                            </View>
                        </View>
                    ));
                    this.setState({surveyItemListArr: surveyItemListArrr});
                } else if (responseJson.status === 'user has already filled this survey') {
                    this.setModalResultFailVisible(true);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    loadSurvey = async () => {
        try {
            this.setState({srvyTitle: await AsyncStorage.getItem('srvyTitle')});
            this.setState({srvyDescription: await AsyncStorage.getItem('srvyDescription')});
            this.setState({srvyCredit: await AsyncStorage.getItem('srvyCredit')});
            this.setState({srvyExpDate: await AsyncStorage.getItem('srvyExpDate')});
            this.setState({srvyID: await AsyncStorage.getItem('srvyID')});
            this.setState({srvyAPI: 'http://127.0.0.1:5000/api/fillSurvey/'+this.state.srvyID});
            // console.log('hiiiiinkxenxekxnii',this.state.srvyAPI);

            this.getSurveyItems();



        } catch (error) {
            // Error retrieving data
        }
    };
    logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}

const styles = StyleSheet.create({
    giftCardCodeModalStyle: {
        height: 250,
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 4,
    },
    giftCardCodeModalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    refreshIcon: {
        width: 25,
        height: 25
    },
    giftHistoryCardBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10
    },
    infoLabel1: {
        margin: 10,
        marginBottom: 0,
        paddingBottom: 5,
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        color: color1,
    },
    buyButtonLabel: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'center',
        color: '#ea24a3',
    },
    refreshButton: {
        width: 25,
        height: 25,
        justifyContent: 'center',
    },
    buyButton: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        backgroundColor: '#fcc8f1',
        justifyContent: 'center',
    },
    giftCardLabel: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan(FaNum)" : "IRANYekanBold(FaNum)",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        paddingRight: 0,
        color: 'white',
    },
    giftCardShopLabel: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan(FaNum)" : "IRANYekanBold(FaNum)",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        paddingTop: 10,
        color: 'white',
    },
    giftCardCode: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan(FaNum)" : "IRANYekanRegular(FaNum)",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        textAlign: 'right',
        paddingRight: 0,
        color: 'white',
    },
    surveyLabels: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        paddingRight: 0,
        color: 'white',
    },
    giftCardLabelCol: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    icGift: {
        width: 80,
        height: 50
    },
    icGiftShop: {
        width: 120,
        height: 75
    },
    giftCard: {
        width: '100%',
        height: 70,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#fc44c5'
    },
    giftCardShop: {
        width: '100%',
        maxHeight: '100%',
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: color1
    },
    giftCardShopModal: {
        width: '90%',
        height: 180,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#fc44c5'
    },
    giftCardFailModal: {
        width: '90%',
        height: 100,
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: '#fc44c5'
    },
    giftCardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    surveyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    giftCardStyle: {
        width: '100%',
        height: '100%'
    },
    giftCardFailStyle: {
        width: '100%',
        height: '50%'
    },
    giftCardModalStyle: {
        width: '100%',
        height: '100%'
    },
    giftCardBuyStyle: {
        width: '100%',
        height: '30%'
    },
    giftCardBuyFailStyle: {
        width: '100%',
        height: '50%'
    },
    giftCardBuyContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    giftCardShopContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingLeft: 10,
        paddingRight: 10
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#ea24a3',
        borderWidth: 3,
    },
    infoIcon: {
        width: 30,
        height: 30
    },
    sideIcon: {
        width: 25,
        height: 25
    },
    infoData: {
        fontFamily: Platform.OS === 'ios' ? "IRANYekan(FaNum)" : "IRANYekanRegular(FaNum)",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "normal" : "normal",
        textAlign: 'right',
        paddingRight: 5,
        color: color1,
    },
    infoLabel: {
        paddingBottom: 5,
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        color: '#ea24a3',
    },
    infoLabelShop: {
        paddingBottom: 5,
        fontFamily: Platform.OS === 'ios' ? "IRANYekan" : "IRANYekanBold",
        fontSize: 17,
        fontWeight: Platform.OS === 'ios' ? "bold" : "normal",
        textAlign: 'right',
        color: '#ea24a3',
        marginLeft: 8
    },
    infoColumn: {
        width: '100%',
        // borderWidth: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        height: 50,
        // borderWidth: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    infoRowGiftShopBar: {
        height: 50,
        width: '40%',
        // borderWidth: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    giftHistoryLabel: {
        maxHeight: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    profileCardContainer: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'transparent',
    },
    giftHistoryCardContainer: {
        margin: 10,
        maxHeight: '100%',
        // paddingTop: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    giftHistoryCardContainer1: {
        margin: 10,
        marginTop: 0,
        maxHeight: '100%',
        // paddingTop: 0,
        flex: 1,
        flexDirection: 'column-reverse',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    giftHistoryCardContainer2: {
        margin: 10,
        marginTop: 0,
        maxHeight: '100%',
        // paddingTop: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'transparent',
    },
    profileCard: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        backgroundColor: color2
    },
    giftHistoryCard: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: color2,
        marginTop: 10,
        paddingTop: 0,
        marginBottom: 30
    },
    giftHistory1Card: {
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fcc8f1',
        marginTop: 10,
        paddingTop: 0,
        marginBottom: 30
    },
    mainContainer: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    mainContainerScrollView: {
        width: '100%',
    },
    giftShopContainerScrollView: {
        width: '100%',
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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    TouchableOpacityboundLeft: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    TouchableOpacityboundLeft1: {
        width: 50,
        height: 50,
        marginLeft: 10,
        opacity: 0
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
        backgroundColor: color1,
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