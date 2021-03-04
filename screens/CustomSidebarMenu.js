import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    Text,
} from 'react-native';

import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#15193c" }}>
            <Image source={require("../assets/logo.png")} style={styles.sideMenuProfileIcon}></Image>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'contain',
        width: 150,
        height: 150,
        borderRadius: 100 / 2,
        alignSelf: 'center',
        marginTop: 60
    },
    titleText: {
        textAlign: "center",
        color: "white",
        fontSize: 28,
        fontFamily: "Bubblegum-Sans",
        marginTop: 30
    }
});

export default CustomSidebarMenu;