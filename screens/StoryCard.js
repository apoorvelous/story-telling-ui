import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from "firebase";

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
            speakerIcon: 'volume-high-outline',
            light_theme: true,
            is_liked: false,
            likes: this.props.story.value.likes,
            story_id: this.props.story.key,
            story_data: this.props.story.value
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    async fetchUser() {
        let theme;
        await firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme
            })
        this.setState({ light_theme: theme === "light" ? true : false })
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }

    likeAction = () => {
        if (this.state.is_liked) {
            firebase.database()
                .ref('posts')
                .child(this.state.story_id)
                .child('likes')
                .set(firebase.database.ServerValue.increment(-1))
            this.setState({ likes: this.state.likes -= 1, is_liked: false })
        } else {
            firebase.database()
                .ref('posts')
                .child(this.state.story_id)
                .child('likes')
                .set(firebase.database.ServerValue.increment(1))
            this.setState({ likes: this.state.likes += 1, is_liked: true })
        }
    }

    render() {
        let story = this.state.story_data
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            let images = {
                "image_1": require("../assets/story_image_1.png"),
                "image_2": require("../assets/story_image_2.png"),
                "image_3": require("../assets/story_image_3.png"),
                "image_4": require("../assets/story_image_4.png"),
                "image_5": require("../assets/story_image_5.png")
            }
            return (
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("StoryScreen", { story: { story }, story_id: this.state.story_id })}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={this.state.light_theme ? styles.cardContainerLight : styles.cardContainer}>
                        <View style={styles.storyImage}>
                            <Image source={images[story.preview_image]} style={{ resizeMode: 'contain', width: Dimensions.get('window').width - 60, height: 250, borderRadius: 10, marginTop: -15 }}></Image>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleTextContainer}>
                                <View style={styles.storyTitle}>
                                    <Text style={this.state.light_theme ? styles.storyTitleTextLight : styles.storyTitleText}>{story.title}</Text>
                                </View>
                                <View style={styles.storyAuthor}>
                                    <Text style={this.state.light_theme ? styles.storyAuthorTextLight : styles.storyAuthorText}>{story.author}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.descriptionContainer}>
                            <Text style={this.state.light_theme ? styles.descriptionTextLight : styles.descriptionText}>
                                {story.description}
                            </Text>
                        </View>
                        <View style={styles.actionContainer}>
                            <TouchableOpacity onPress={() => this.likeAction()}>
                                <View style={this.state.is_liked ? styles.likeButtonLiked : styles.likeButtonDisliked}>
                                    <View style={styles.likeIcon}>
                                        <Ionicons name={"heart"} size={30} color={this.state.light_theme ? "black" : "white"} style={{ width: 30, marginLeft: 20, marginTop: 5 }} />
                                    </View>
                                    <View>
                                        <Text style={this.state.light_theme ? styles.likeTextLight : styles.likeText}>{this.state.likes}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
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
    cardContainerLight: {
        marginTop: -20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        height: undefined,
        padding: 10,
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
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
    storyTitleTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        color: "black"
    },
    storyAuthorText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 18,
        color: "white"
    },
    storyAuthorTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 18,
        color: "black"
    },
    descriptionContainer: {
        marginTop: 5
    },
    descriptionText: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "white"
    },
    descriptionTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 13,
        color: "black"
    },
    actionContainer: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    likeButtonLiked: {
        backgroundColor: "#eb3948",
        borderRadius: 30,
        width: 160,
        height: 40,
        flexDirection: "row"
    },
    likeButtonDisliked: {
        borderColor: "#eb3948",
        borderWidth: 2,
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
    },
    likeTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
    }
});