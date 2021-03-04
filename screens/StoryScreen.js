import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { TouchableOpacity } from "react-native-gesture-handler";

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class StoryScreen extends Component {
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

    async initiateTTS(title, author, story, moral) {
        const current_color = this.state.speakerColor
        this.setState({ speakerColor: current_color === "gray" ? "#ee8249" : "gray" })
        if (current_color === "gray") {
            await Speech.speak(`${title} by ${author}`)
            await Speech.speak(story)
            await Speech.speak("The moral of the story is!")
            await Speech.speak(moral)
        } else {
            Speech.stop()
        }
    }

    render() {
        if (!this.props.route.params.story.story) {
            this.props.navigation.navigate("Home")
        } else if (!this.state.fontsLoaded) {
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
                    <View style={styles.storyContainer}>
                        <ScrollView style={styles.storyCard}>
                            <View style={styles.imageContainer}>
                                <Image source={require("../assets/story_image.png")} style={{ resizeMode: 'contain', width: undefined, borderRadius: 5 }}></Image>
                            </View>
                            <View style={styles.dataContainer}>
                                <View style={styles.titleTextContainer}>
                                    <View style={styles.storyTitle}>
                                        <Text style={styles.storyTitleText}>{this.props.route.params.story.story.title}</Text>
                                    </View>
                                    <View style={styles.storyAuthor}>
                                        <Text style={styles.storyAuthorText}>{this.props.route.params.story.story.author}</Text>
                                    </View>
                                    <View style={styles.storyAuthor}>
                                        <Text style={styles.storyAuthorText}>{this.props.route.params.story.story.created_on}</Text>
                                    </View>
                                </View>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => this.initiateTTS(this.props.route.params.story.story.title, this.props.route.params.story.story.author, this.props.route.params.story.story.story, this.props.route.params.story.story.moral)}>
                                        <Ionicons name={this.state.speakerIcon} size={30} color={this.state.speakerColor} style={{ width: 30, margin: 15 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.storyTextContainer}>
                                <View>
                                    <Text style={styles.storyText}>{this.props.route.params.story.story.story}</Text>
                                </View>
                                <View>
                                    <Text style={styles.moralText}>Moral - {this.props.route.params.story.story.moral}</Text>
                                </View>
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
                        </ScrollView>
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
    storyContainer: {
        flex: 1
    },
    storyCard: {
        margin: 20,
        backgroundColor: "#2f345d",
        borderRadius: 20,
    },
    imageContainer: {
        flex: 0.4
    },
    dataContainer: {
        flex: 0.6,
        flexDirection: "row",
        padding: 20
    },
    titleTextContainer: {
        flex: 0.8
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
    iconContainer: {
        flex: 0.2
    },
    storyTextContainer: {
        padding: 20
    },
    storyText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 15,
        color: "white"
    },
    moralText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 20,
        color: "white"
    },
    actionContainer: {
        margin: 10,
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