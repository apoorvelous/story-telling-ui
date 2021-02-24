## Installing React Navigation

```sh
yarn add @react-navigation/native
```

```sh
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## Bottom Tab Navigation

```sh
yarn add @react-navigation/bottom-tabs
```

## Code for the basic template setup of 2 screens with bottom tab navigation

### App.js
```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "./screens/Feed";
import CreateStory from "./screens/CreateStory";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused
                ? 'book'
                : 'book-outline';
            } else if (route.name === 'CreateStory') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="CreateStory" component={CreateStory} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

### CreateStory.js

```js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class CreateStory extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Create Story</Text>
            </View>
        )
    }
}
```

### Feed.js
```js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Feed extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Feeds</Text>
            </View>
        )
    }
}
```

## Adding Drawer Navigation to the project
```sh
yarn add @react-navigation/drawer
```

### Profile.js
```js
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class Profile extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text>Profile</Text>
            </View>
        )
    }
}
```

### TabNavigator.js
```js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Feed') {
                        iconName = focused
                            ? 'book'
                            : 'book-outline';
                    } else if (route.name === 'CreateStory') {
                        iconName = focused ? 'create' : 'create-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="CreateStory" component={CreateStory} />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator
```

### DrawerNavigator.js
```js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import Profile from "../screens/Profile";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
```

### App.js
```js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from "./navigation/DrawerNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
```

## Home Screen Dark Mode
We will be using Material Tab Navigator

```sh
yarn add @react-navigation/material-bottom-tabs react-native-paper
```

### TabNavigator.js
```js
import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            labeled={false}
            barStyle={styles.bottomTabStyle}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Feed') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline';
                    } else if (route.name === 'Create Story') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }
                    return <Ionicons name={iconName} size={30} color={color} style={{ width: 30 }} />;
                },
            })}
            activeColor={'#ee8249'}
            inactiveColor={'gray'}
        >
            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Create Story" component={CreateStory} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: "#2f345d",
        height: "8%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        position: 'absolute'
    }
});

export default BottomTabNavigator
```

For fonts, create a folder named Fonts in Assets folder. Download the font from -

https://fonts.google.com/specimen/Bubblegum+Sans?query=bubble&preview.text_type=custom

Place the .ttf file in the fonts folder. Then we'll install expo-fonts

```sh
expo install expo-font
expo install expo-app-loading
```

We will also move the Logo Image and the story image to our Assets Folder.

### Feed.js
```js
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image
} from "react-native";
import StoryCard from "./StoryCard";

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { FlatList } from "react-native-gesture-handler";

let customFonts = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

let stories = require("./temp_stories.json");

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
        };
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    renderItem = ({ item: story }) => {
        return <StoryCard story={story} />
    };

    keyExtractor = (item, index) => index.toString();

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
                    <View style={styles.cardContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={stories}
                            renderItem={this.renderItem}
                        />
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
    cardContainer: {
        flex: 0.85
    }
});
```

Our temp stories would look something like this in the screens folder -

### temp_stories.json
```json
[
    {
        "title": "The Boy Who Cried Wolf",
        "author": "Apoorv Goyal",
        "created_on": "25th January, 2021",
        "description": "A story of a boy who lied and lost the trust of people near him",
        "story": "<p>Once upon a time, there lived a shepherd boy who was bored watching his flock of sheep on the hill. To amuse himself, he shouted, “Wolf! Wolf! The sheep are being chased by the wolf!” The villagers came running to help the boy and save the sheep. They found nothing and the boy just laughed looking at their angry faces.</p><p>“Don’t cry ‘wolf’ when there’s no wolf boy!”, they said angrily and left. The boy just laughed at them.</p><p>After a while, he got bored and cried ‘wolf!’ again, fooling the villagers a second time. The angry villagers warned the boy a second time and left. The boy continued watching the flock. After a while, he saw a real wolf and cried loudly, “Wolf! Please help! The wolf is chasing the sheep. Help!”</p><p>But this time, no one turned up to help. By evening, when the boy didn’t return home, the villagers wondered what happened to him and went up the hill. The boy sat on the hill weeping. “Why didn’t you come when I called out that there was a wolf?” he asked angrily. “The flock is scattered now”, he said.</p><p>An old villager approached him and said, “People won’t believe liars even when they tell the truth. We’ll look for your sheep tomorrow morning. Let’s go home now”.</p>",
        "moral": "Lying breaks trust. Nobody trusts a liar, even when he is telling the truth."
    },
    {
        "title": "The Midas Touch",
        "author": "Saurabh Aswani",
        "created_on": "14th February, 2021",
        "description": "A story of a king and his greed",
        "story": "<p>In ancient Greek, there was a king named Midas. He had a lot of gold and everything he needed. He also had a beautiful daughter. Midas loved his gold very much, but he loved his daughter more than his riches.</p><p>One day, a satyr named Silenus got drunk and passed out in Midas’ rose garden. Believing that Satyrs always bring good luck, Midas lets Silenus rest in his palace until he is sober, against the wishes of his wife and daughter. Silenus is a friend of Dionysus, the god of wine and celebration. Upon learning Midas’ kindness towards his friend, Dionysus decides to reward the keg.</p><p>When asked to wish for something, Midas says “I wish everything I touch turns to gold”. Although Dionysus knew it was not a great idea, he granted Midas his wish.</p><p>Happy that his wish was granted, Midas went around touching random things in the garden and his palace and turned them all into gold. He touched an apple, and it turned into a shiny gold apple. His subjects were astonished but happy to see so much gold in the palace.</p><p>In his happiness, Midas went and hugged his daughter, and before he realized, he turned her into a lifeless, golden statue! Aghast, Midas ran back to the garden and called for Dionysus. He begged the god to take away his power and save his daughter. Dionysus gives Midas a solution to change everything back to how it was before the wish. Midas learned his lesson and lived the rest of his life contended with what he had.</p>",
        "moral": "Do not get greedy. Be happy and content with what you have."
    }
]
```

### StoryCard.js

```js
import React, { Component } from 'react';
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
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
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
                </View>
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
```

## Create a new story Screen Dark Mode

First, we need dropdown in our page so let's install a library for that -

```sh
yarn add react-native-dropdown-picker
```

Next, let's work on the code -

### CreateStory.js
```js
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
```