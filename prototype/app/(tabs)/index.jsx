import {View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

const Index = () => {
    const { t } = useTranslation();

    const QuickAccessItem = ({ IconComponent, iconName, iconSize = 32, iconColor = "#666", title, subtitle, onPress, bgColor }) => (
        <TouchableOpacity style={[styles.quickAccessItem, { backgroundColor: bgColor }]} onPress={onPress}>
            <View style={styles.iconContainer}>
                <IconComponent name={iconName} size={iconSize} color={iconColor} />
            </View>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
    );

    const SchemeCard = ({ title, description, buttonText, onPress }) => (
        <View style={styles.schemeCard}>
            <Text style={styles.schemeTitle}>{title}</Text>
            <Text style={styles.schemeDescription}>{description}</Text>
            <TouchableOpacity style={styles.learnMoreButton} onPress={onPress}>
                <Text style={styles.learnMoreText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <View style={styles.welcomeContainer}>
                        <Ionicons name="hand-right" size={20} color="#4CAF50" />
                        <Text style={styles.welcomeText}>{t("home_screen.welcome") || "Welcome Back, Shaurya"}</Text>
                    </View>
                    <Text style={styles.greetingText}>Good Morning</Text>
                </View>
                <View style={styles.notificationIcon}>
                    <Ionicons name="notifications" size={24} color="#666" />
                    <View style={styles.notificationBadge} />
                </View>
            </View>

            {/* Quick Access Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}> {t("quick_access.quickAccess") || "Quick Access"}</Text>
                <View style={styles.quickAccessGrid}>
                    <QuickAccessItem
                        IconComponent={MaterialIcons}
                        iconName="medical-services"
                        iconColor="#1976D2"
                        title={t("quick_access.consultDoctor") || "Consult Doctor"}
                        subtitle={t("quick_access.consultDoctor_sub") || "Book appointment"}
                        bgColor="#E3F2FD"
                        onPress={() => console.log('Consult Doctor pressed')}
                    />
                    <QuickAccessItem
                        IconComponent={MaterialIcons}
                        iconName="search"
                        iconColor="#388E3C"
                        title={t("quick_access.findMedicines") || "Find Medicines"}
                        subtitle="Stock availability"
                        bgColor="#E8F5E8"
                        onPress={() => console.log('Find Medicines pressed')}
                    />
                    <QuickAccessItem
                        IconComponent={Ionicons}
                        iconName="document-text"
                        iconColor="#7B1FA2"
                        title={t("quick_access.medicalReports") || "Medical Reports"}
                        subtitle={t("quick_access.medicalReports_sub") || "Family health records"}
                        bgColor="#F3E5F5"
                        onPress={() => console.log('Medical Reports pressed')}
                    />
                    <QuickAccessItem
                        IconComponent={MaterialIcons}
                        iconName="smart-toy"
                        iconColor="#512DA8"
                        title={t("quick_access.sahayak") || "Sahayak"}
                        subtitle={t("quick_access.sahayak_sub") || "AI Health Assistant"}
                        bgColor="#E8E5FF"
                        onPress={() => console.log('Sahayak pressed')}
                    />
                </View>
            </View>

            {/* Government Schemes Section */}
            <View style={styles.section}>
                <View style={styles.sectionTitleContainer}>
                    <AntDesign name="bank" size={20} color="#FF9800" />
                    <Text style={styles.sectionTitle}>{t("home_screen.government_schemes")}</Text>
                </View>
                <View style={styles.schemesContainer}>
                    <SchemeCard
                        title={t("government_schemes.ayushman_bharat")}
                        description={t("government_schemes.ayushman_description")}
                        buttonText={t("government_schemes.learn_more")}
                        onPress={() => console.log('Ayushman Bharat pressed')}
                    />
                    <SchemeCard
                        title={t("government_schemes.abha")}
                        description={t("government_schemes.abha_description")}
                        buttonText={t("government_schemes.learn_more")}
                        onPress={() => console.log('ABHA pressed')}
                    />
                </View>
            </View>

            {/* Emergency Button */}
            <TouchableOpacity style={styles.emergencyButton}>
                <MaterialIcons name="warning" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingTop: 40,
    },
    welcomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    welcomeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    greetingText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    notificationIcon: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 12,
        height: 12,
        backgroundColor: '#FF4444',
        borderRadius: 6,
    },
    languageContainer: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    quickAccessGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    quickAccessItem: {
        width: '48%',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 8,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 4,
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    schemesContainer: {
        gap: 12,
    },
    schemeCard: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    schemeTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    schemeDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
        lineHeight: 20,
    },
    learnMoreButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    learnMoreText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    emergencyButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        backgroundColor: '#FF4444',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
});

export default Index