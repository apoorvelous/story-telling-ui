import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            defaultImage: "image_1"
        };
    }

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
                                New Story
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={styles.fieldsContainer}>
                        <View style={styles.imageContainer}>
                            <View style={styles.previewContainer}>
                                <Image source={require("../assets/story_image.png")} style={{ resizeMode: 'contain', width: undefined, borderRadius: 10, marginBottom: 10 }}></Image>
                            </View>
                            <View style={styles.chooseImage}>
                                <DropDownPicker
                                    items={[
                                        { label: 'Image 1', value: 'image_1' }
                                    ]}
                                    defaultValue={this.state.defaultImage}
                                    containerStyle={{ height: 40, borderRadius: 20, marginBottom: 10 }}
                                    style={{ backgroundColor: 'transparent' }}
                                    itemStyle={{
                                        justifyContent: 'flex-start'
                                    }}
                                    dropDownStyle={{ backgroundColor: '#2f345d' }}
                                    labelStyle={{ color: "white", fontFamily: "Bubblegum-Sans" }}
                                    arrowStyle={{ color: "white", fontFamily: "Bubblegum-Sans" }}
                                    onChangeItem={item => this.setState({
                                        defaultImage: item.value
                                    })}
                                />
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={styles.inputFont}
                                onChangeText={(title) => this.setState({ title })}
                                placeholder={"Title"}
                                placeholderTextColor="white"
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                onChangeText={(description) => this.setState({ description })}
                                placeholder={"Description"}
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="white"
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                onChangeText={(story) => this.setState({ story })}
                                placeholder={"Story"}
                                multiline={true}
                                numberOfLines={20}
                                placeholderTextColor="white"
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={[styles.inputFont, styles.inputFontExtra, styles.inputTextBig]}
                                onChangeText={(moral) => this.setState({ moral })}
                                placeholder={"Moral of the story"}
                                multiline={true}
                                numberOfLines={4}
                                placeholderTextColor="white"
                            />
                        </View>
                    </ScrollView>
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
    fieldsContainer: {
        flex: 0.85,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 100
    },
    inputFont: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        color: "white",
        fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
        marginTop: 10,
    },
    inputTextBig: {
        textAlignVertical: "top",
        height: undefined,
        padding: 5
    }
});