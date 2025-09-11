import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { useTranslation } from "react-i18next";
import {
    MaterialIcons,
    Ionicons,
    MaterialCommunityIcons,
    FontAwesome5,
    Entypo
} from '@expo/vector-icons';

// Translation object for emergency screen
const emergency = {
    "title": "Emergency",
    "emergencyContacts": "Emergency Contacts",
    "ambulance": "Ambulance",
    "ambulanceDesc": "Emergency Medical Services",
    "police": "Police",
    "policeDesc": "Emergency Police Services",
    "fireBrigade": "Fire Brigade",
    "fireBrigadeDesc": "Fire Emergency Services",
    "nearestHospital": "Nearest Hospital",
    "civilHospital": "Civil Hospital Nabha",
    "hospitalLocation": "Civil Lines, Nabha, Punjab",
    "distance": "2.1 km",
    "rating": "4.2"
};

const Emergency = () => {
    const { t } = useTranslation();

    const handleCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const EmergencyContact = ({ IconComponent, iconName, title, description, number, color, iconColor }) => (
        <View style={styles.contactCard}>
            <View style={styles.contactInfo}>
                <View style={[styles.iconContainer, { backgroundColor: `${iconColor}15` }]}>
                    <IconComponent name={iconName} size={24} color={iconColor} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.contactTitle}>
                        {t(`emergency.${title}`) || emergency[title]}
                    </Text>
                    <Text style={styles.contactDesc}>
                        {t(`emergency.${description}`) || emergency[description]}
                    </Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.callButton, { backgroundColor: color }]}
                onPress={() => handleCall(number)}
            >
                <Ionicons name="call" size={16} color="#fff" style={styles.callIcon} />
                <Text style={styles.callButtonText}>{number}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.emergencyBadge}>
                    <MaterialIcons name="emergency" size={24} color="#f44336" />
                    <Text style={styles.headerTitle}>
                        {t("emergency.title") || emergency.title}
                    </Text>
                    <TouchableOpacity style={styles.closeButton}>
                        <Ionicons name="close" size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Emergency Contacts Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    {t("emergency.emergencyContacts") || emergency.emergencyContacts}
                </Text>

                <EmergencyContact
                    IconComponent={FontAwesome5}
                    iconName="ambulance"
                    title="ambulance"
                    description="ambulanceDesc"
                    number="108"
                    color="#4FC3F7"
                    iconColor="#f44336"
                />

                <EmergencyContact
                    IconComponent={MaterialIcons}
                    iconName="local-police"
                    title="police"
                    description="policeDesc"
                    number="100"
                    color="#4FC3F7"
                    iconColor="#2196F3"
                />

                <EmergencyContact
                    IconComponent={MaterialCommunityIcons}
                    iconName="fire-truck"
                    title="fireBrigade"
                    description="fireBrigadeDesc"
                    number="101"
                    color="#4FC3F7"
                    iconColor="#FF5722"
                />
            </View>

            {/* Nearest Hospital Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    {t("emergency.nearestHospital") || emergency.nearestHospital}
                </Text>

                <View style={styles.hospitalCard}>
                    <View style={styles.hospitalHeader}>
                        <View style={styles.hospitalIconContainer}>
                            <FontAwesome5 name="hospital" size={20} color="#4CAF50" />
                        </View>
                        <View style={styles.hospitalInfo}>
                            <Text style={styles.hospitalName}>
                                {t("emergency.civilHospital") || emergency.civilHospital}
                            </Text>
                            <Text style={styles.hospitalLocation}>
                                {t("emergency.hospitalLocation") || emergency.hospitalLocation}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.hospitalMeta}>
                        <View style={styles.metaItem}>
                            <Entypo name="location-pin" size={16} color="#FF5722" />
                            <Text style={styles.metaText}>
                                {t("emergency.distance") || emergency.distance}
                            </Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Ionicons name="star" size={16} color="#FFC107" />
                            <Text style={styles.metaText}>
                                {t("emergency.rating") || emergency.rating}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
        paddingTop: '20%',
    },
    header: {
        marginBottom: 24,
    },
    emergencyBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#f44336',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f44336',
        marginLeft: 12,
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        paddingLeft: 4,
    },
    contactCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    contactDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    callButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 80,
        justifyContent: 'center',
    },
    callIcon: {
        marginRight: 6,
    },
    callButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    hospitalCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    hospitalHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    hospitalIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#E8F5E8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    hospitalInfo: {
        flex: 1,
    },
    hospitalName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    hospitalLocation: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    hospitalMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    metaText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 6,
        fontWeight: '500',
    },
});

export default Emergency