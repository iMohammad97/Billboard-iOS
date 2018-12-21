import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
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
        this.loggedIn = this.loggedIn.bind(this);
    };

    state = {
        loginView: true,
    };

    loggedIn() {
        this.props.setModalVisible(false);
    };

    setLoggInModalVisible = visible => {
        this.setState({loginView: visible});
    };

    render() {
        return (
            <View style={{height: '100%', width: '100%'}}>


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