import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    Button, Image,
    StatusBar,
    StyleSheet, Text, TouchableOpacity,
    View,
} from 'react-native';
import Modal from "react-native-modal";
import Login from "./Login";
import Signup from "./Signup";

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome to the app!',
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
                <Modal
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    hideModalContentWhileAnimating={true}
                    // onBackdropPress={() => this.setState({loginView: false})}
                    isVisible={this.state.signupView}
                    style={{margin: 0}}
                    onRequestClose={() => {
                        alert('Modal has been closed.');
                    }}>
                    <Signup setSignedUpModalVisible={this.setSignedUpModalVisible}/>
                </Modal>
                {/*<Text style={styles.instructions}>{instructions}</Text>*/}
            </View>
            // <View style={styles.container}>
            //     <Button title="Show me more of the app" onPress={this._showMoreApp} />
            //     <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
            // </View>
        );
    }

    _showMoreApp = () => {
        this.props.navigation.navigate('Other');
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
}