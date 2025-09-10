import { Stack } from 'expo-router';
import { initI18n } from "../i18n/index";
import React, {useState} from "react";
import {changeLanguage} from "i18next";

export default function RootLayout() {
    const [loaded, setLoaded] = useState(false);
    initI18n().then(()=>{
        setLoaded(true)
        //TODO remove this after adding lang option
        changeLanguage("en-US")
    });
    if (!loaded) {
        return null;
    }
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}