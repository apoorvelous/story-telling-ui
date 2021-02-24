import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackNavigator from "../navigation/StackNavigator";

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            speakerColor: "gray",
            speakerIcon: 'volume-high-outline'
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
        let story = this.props.story
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("StoryScreen", { story: { story } })}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.cardContainer}>
                        <View style={styles.storyImage}>
                            <Image source={require("../assets/story_image.png")} style={{ resizeMode: 'contain', width: undefined, borderRadius: 10 }}></Image>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleTextContainer}>
                                <View style={styles.storyTitle}>
                                    <Text style={styles.storyTitleText}>{this.props.story.title}</Text>
                                </View>
                                <View style={styles.storyAuthor}>
                                    <Text style={styles.storyAuthorText}>{this.props.story.author}</Text>
                                </View>
                            </View>
                            <View style={styles.iconContainer}>
                                <Ionicons name={this.state.speakerIcon} size={30} color={this.state.speakerColor} style={{ width: 30, margin: 15 }} />
                            </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.descriptionText}>
                                {this.props.story.description}
                            </Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <View style={styles.likeButton}>
                                <View style={styles.likeIcon}>
                                    <Ionicons name={"heart"} size={30} color={"white"} style={{ width: 30, marginLeft: 20, marginTop: 5 }} />
                                </View>
                                <View>
                                    <Text style={styles.likeText}>12k</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    cardContainer: {
        marginTop: -20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "#2f345d",
        borderRadius: 20,
        height: undefined,
        padding: 10
    },
    titleContainer: {
        flexDirection: "row"
    },
    titleTextContainer: {
        flex: 0.8
    },
    iconContainer: {
        flex: 0.2
    },
    storyTitleText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        color: "white"
    },
    storyAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 18,
        color: "white"
    },
    descriptionContainer: {
        marginTop: 5
    },
    descriptionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "white"
    },
    actionContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    likeButton: {
        backgroundColor: "#eb3948",
        borderRadius: 30,
        width: 160,
        height: 40,
        flexDirection: "row"
    },
    likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
    }
});