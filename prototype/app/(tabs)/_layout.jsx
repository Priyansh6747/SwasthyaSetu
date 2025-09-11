import {Stack, Tabs} from 'expo-router';
import { View, Text , StyleSheet } from 'react-native';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.navBar,
                tabBarShowLabel: true,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarItemStyle: styles.navBarItem,
                tabBarActiveTintColor: "#007AFF",
                tabBarInactiveTintColor: "#8E8E93",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size, focused}) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Appointment"
                options={{
                    title: "Appointments",
                    tabBarIcon: ({ color, size, focused}) => (
                        <Ionicons name={focused ? "calendar" : "calendar-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Records"
                options={{
                    title: "Records",
                    tabBarIcon: ({ color, size, focused}) => (
                        <Ionicons name={focused ? "document-text" : "document-text-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Sahayak"
                options={{
                    title: "Sahayak",
                    tabBarIcon: ({ color, size, focused}) => (
                        <Ionicons name={focused ? "chatbubble" : "chatbubble-outline"} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size, focused}) => (
                        <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: '15%',
    },
    navBar: {
        height: 80,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E7',
        paddingTop: 8,
        paddingBottom: 8,
    },
    navBarItem: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: '500',
        marginTop: 2,
    },
});