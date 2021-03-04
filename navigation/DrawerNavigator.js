import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#e91e63',
                inactiveTintColor: "white",
                itemStyle: { marginVertical: 5 },
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen name="Home" component={StackNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;