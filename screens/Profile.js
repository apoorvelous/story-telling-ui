import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Switch
} from "react-native";

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};


export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            isEnabled: false
        };
    }

    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        this.setState({ isEnabled: !previous_state })
    };

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image source={require("../assets/logo.png")} style={{ width: 60, height: 60, resizeMode: 'contain', marginLeft: 10 }}></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}>
                                Story Telling App
                            </Text>
                        </View>
                    </View>
                    <View style={styles.screenContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>Apoorv Goyal</Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <Text style={styles.actionText}>Change Profile Picture</Text>
                        </View>
                        <View style={styles.themeContainer}>
                            <View style={styles.themeTextContainer}>
                                <Text style={styles.themeText}>Theme</Text>
                            </View>
                            <View style={styles.switchContainer}>
                                <Switch
                                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => this.toggleSwitch()}
                                    value={this.state.isEnabled}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#15193c"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5,
    },
    appIcon: {
        flex: 0.3
    },
    appTitleTextContainer: {
        justifyContent: "center",
        alignItems: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: 28,
        fontFamily: "Bubblegum-Sans",
        paddingLeft: 20
    },
    screenContainer: {
        flex: 0.85
    },
    profileImageContainer: {
        flex: 0.3,
        marginTop: 50,
        alignItems: "center"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,

    },
    nameContainer: {
        flex: 0.1,
        alignItems: "center"
    },
    nameText: {
        color: "white",
        fontSize: 40,
        fontFamily: "Bubblegum-Sans",
    },
    actionContainer: {
        flex: 0.1,
        alignItems: "center"
    },
    actionText: {
        marginTop: 20,
        color: "white",
        fontSize: 18,
        fontFamily: "Bubblegum-Sans",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#ee8249",
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 30,
        paddingRight: 30
    },
    themeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 80
    },
    themeTextContainer: {
        alignItems: "center",
        flex: 0.5
    },
    themeText: {
        color: "white",
        fontSize: 30,
        fontFamily: "Bubblegum-Sans",
    },
    switchContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
});