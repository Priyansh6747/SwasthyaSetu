import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Switch,
    Linking
} from 'react-native';
import { useTranslation } from "react-i18next";

const Profile = () => {
    const { t, i18n } = useTranslation();

    const [notifications, setNotifications] = useState({
        sms: true,
        whatsapp: true,
        inApp: true,
        appointments: true,
        medicines: true,
        vaccinations: false
    });

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        Alert.alert('Language Changed', `Language switched to ${langCode}`);
    };

    const toggleNotification = (type) => {
        setNotifications(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const handleLogout = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => {
                        // Mock logout functionality
                        Alert.alert('Logged out successfully');
                    }}
            ]
        );
    };

    const handleSupport = (type) => {
        if (type === 'call') {
            Alert.alert('Call Support', 'Calling 1800-XXX-XXXX', [
                { text: 'Cancel' },
                { text: 'Call', onPress: () => Linking.openURL('tel:1800XXXXXXX') }
            ]);
        } else {
            Alert.alert('WhatsApp', 'Opening WhatsApp chat...', [
                { text: 'OK', onPress: () => Linking.openURL('whatsapp://send?phone=1800XXXXXXX') }
            ]);
        }
    };

    const handleEditProfile = () => {
        Alert.alert('Edit Profile', 'Edit profile functionality coming soon');
    };

    const handleManageFamily = () => {
        Alert.alert('Manage Family', 'Family management functionality coming soon');
    };

    const handlePaymentMethods = () => {
        Alert.alert('Payment Methods', 'Payment settings functionality coming soon');
    };

    const handlePrivacySecurity = () => {
        Alert.alert('Privacy & Security', 'Privacy settings functionality coming soon');
    };

    const handleHelpFAQs = () => {
        Alert.alert('Help & FAQs', 'Help section functionality coming soon');
    };

    const familyMembers = [
        { name: 'Rajesh Kumar', relation: t('profile.father', 'Father'), status: 'active' },
        { name: 'Sunita Devi', relation: t('profile.mother', 'Mother'), status: 'active' },
        { name: 'Priya', relation: t('profile.wife', 'Wife'), status: 'active' },
        { name: 'Aryan', relation: t('profile.son', 'Son'), status: 'active' }
    ];

    const governmentSchemes = [
        {
            name: t('profile.ayushman_bharat', 'Ayushman Bharat'),
            description: t('profile.coverage', '₹5,00,000 coverage'),
            status: t('profile.active', 'Active'),
            statusStyle: styles.activeStatus
        },
        {
            name: t('profile.abha_health_id', 'ABHA Health ID'),
            description: t('profile.digital_health_records', 'Digital health records'),
            status: t('profile.linked', 'Linked'),
            statusStyle: styles.linkedStatus
        },
        {
            name: t('profile.punjab_health_scheme', 'Punjab Health Scheme'),
            description: t('profile.state_benefits', 'State benefits'),
            status: t('profile.eligible', 'Eligible'),
            statusStyle: styles.eligibleStatus
        }
    ];

    const languageOptions = [
        { code: 'en-US', name: t('profile.english', 'English') },
        { code: 'hi-IN', name: t('profile.hindi', 'हिंदी') },
        { code: 'pa-IN', name: t('profile.punjabi', 'ਪੰਜਾਬੀ') }
    ];

    const notificationItems = [
        { key: 'sms', label: t('profile.sms', 'SMS') },
        { key: 'whatsapp', label: t('profile.whatsapp', 'WhatsApp') },
        { key: 'inApp', label: t('profile.in_app', 'In App') },
        { key: 'appointments', label: t('profile.appointments', 'Appointments') },
        { key: 'medicines', label: t('profile.medicines', 'Medicines') },
        { key: 'vaccinations', label: t('profile.vaccinations', 'Vaccinations') }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.profileIcon}>
                        <Text style={styles.profileIconText}>👤</Text>
                    </View>
                    <Text style={styles.headerTitle}>{t('profile.title', 'Profile')}</Text>
                </View>
            </View>

            {/* User Profile Section */}
            <View style={styles.card}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>👤</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>Shaurya Rajput</Text>
                            <Text style={styles.userDetails}>
                                {t('profile.age', 'Age')} 28 • {t('profile.nabha_punjab', 'Nabha, Punjab')}
                            </Text>
                            <Text style={styles.abhaId}>ABHA-1234-5678-9012</Text>
                        </View>
                        <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
                            <Text style={styles.editText}>✏️</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoRow}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>
                                📞 {t('profile.phone', 'Phone')}
                            </Text>
                            <Text style={styles.infoValue}>+91 98765 43210</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>
                                🛡️ {t('profile.abha_status', 'ABHA Status')}
                            </Text>
                            <Text style={styles.verifiedText}>{t('profile.verified', 'Verified')}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Family Members Section */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionIcon}>👥</Text>
                        <Text style={styles.sectionTitle}>
                            {t('profile.family_members', 'Family Members')}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={handleManageFamily}>
                        <Text style={styles.manageButton}>{t('profile.manage', 'Manage')}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.familyList}>
                    {familyMembers.map((member, index) => (
                        <View key={index} style={styles.familyMember}>
                            <View>
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberRelation}>{member.relation}</Text>
                            </View>
                            <View style={styles.activeStatus}>
                                <Text style={styles.activeStatusText}>{t('profile.active', 'Active')}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Government Schemes Section */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionIcon}>🛡️</Text>
                        <Text style={styles.sectionTitle}>
                            {t('profile.government_schemes', 'Government Schemes')}
                        </Text>
                    </View>
                </View>

                <View style={styles.schemesList}>
                    {governmentSchemes.map((scheme, index) => (
                        <View key={index} style={styles.schemeItem}>
                            <View style={styles.schemeInfo}>
                                <Text style={styles.schemeName}>{scheme.name}</Text>
                                <Text style={styles.schemeDescription}>{scheme.description}</Text>
                            </View>
                            <View style={[styles.statusBadge, scheme.statusStyle]}>
                                <Text style={styles.statusText}>{scheme.status}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* Settings Section */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionIcon}>⚙️</Text>
                        <Text style={styles.sectionTitle}>{t('profile.settings', 'Settings')}</Text>
                    </View>
                </View>

                {/* Language Settings */}
                <View style={styles.settingsSection}>
                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingIcon}>🌐</Text>
                            <View>
                                <Text style={styles.settingTitle}>
                                    {t('profile.language_settings', 'Language Settings')}
                                </Text>
                                <Text style={styles.settingSubtitle}>
                                    {t('profile.change_language', 'Change Language')}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.currentLanguage}>
                            {i18n.language === 'en-US' ? 'English' :
                                i18n.language === 'hi-IN' ? 'हिंदी' : 'ਪੰਜਾਬੀ'} ▼
                        </Text>
                    </View>

                    <View style={styles.languageOptions}>
                        {languageOptions.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={[
                                    styles.languageOption,
                                    i18n.language === lang.code && styles.selectedLanguage
                                ]}
                                onPress={() => changeLanguage(lang.code)}
                            >
                                <Text style={[
                                    styles.languageText,
                                    i18n.language === lang.code && styles.selectedLanguageText
                                ]}>
                                    {lang.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Notifications */}
                <View style={styles.settingsSection}>
                    <View style={styles.settingHeader}>
                        <Text style={styles.settingIcon}>🔔</Text>
                        <View>
                            <Text style={styles.settingTitle}>
                                {t('profile.notifications', 'Notifications')}
                            </Text>
                            <Text style={styles.settingSubtitle}>
                                {t('profile.manage_alerts', 'Manage your alerts')}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.notificationsList}>
                        {notificationItems.map((item) => (
                            <View key={item.key} style={styles.notificationItem}>
                                <Text style={styles.notificationLabel}>{item.label}</Text>
                                <Switch
                                    value={notifications[item.key]}
                                    onValueChange={() => toggleNotification(item.key)}
                                    trackColor={{ false: '#e5e7eb', true: '#3b82f6' }}
                                    thumbColor={notifications[item.key] ? '#ffffff' : '#f3f4f6'}
                                />
                            </View>
                        ))}
                    </View>
                </View>

                {/* Payment Methods */}
                <TouchableOpacity style={styles.settingItem} onPress={handlePaymentMethods}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingIcon}>💳</Text>
                        <View>
                            <Text style={styles.settingTitle}>
                                {t('profile.payment_methods', 'Payment Methods')}
                            </Text>
                            <Text style={styles.settingSubtitle}>
                                {t('profile.upi_cash', 'UPI • Cash on Delivery')}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.chevron}>▶</Text>
                </TouchableOpacity>

                {/* Privacy & Security */}
                <TouchableOpacity style={styles.settingItem} onPress={handlePrivacySecurity}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingIcon}>🔒</Text>
                        <View>
                            <Text style={styles.settingTitle}>
                                {t('profile.privacy_security', 'Privacy & Security')}
                            </Text>
                            <Text style={styles.settingSubtitle}>
                                {t('profile.data_protection', 'Data protection settings')}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.chevron}>▶</Text>
                </TouchableOpacity>
            </View>

            {/* Support Section */}
            <View style={styles.card}>
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleContainer}>
                        <Text style={styles.sectionIcon}>❓</Text>
                        <Text style={styles.sectionTitle}>{t('profile.support', 'Support')}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.settingItem} onPress={handleHelpFAQs}>
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingIcon}>❓</Text>
                        <View>
                            <Text style={styles.settingTitle}>
                                {t('profile.help_faqs', 'Help & FAQs')}
                            </Text>
                            <Text style={styles.settingSubtitle}>
                                {t('profile.help_language', 'Get help in your language')}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.chevron}>▶</Text>
                </TouchableOpacity>

                <View style={styles.supportButtons}>
                    <TouchableOpacity
                        style={styles.supportButton}
                        onPress={() => handleSupport('call')}
                    >
                        <Text style={styles.supportIcon}>📞</Text>
                        <Text style={styles.supportButtonTitle}>
                            {t('profile.call_support', 'Call Support')}
                        </Text>
                        <Text style={styles.supportButtonSubtitle}>1800-XXX-XXXX</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.supportButton}
                        onPress={() => handleSupport('whatsapp')}
                    >
                        <Text style={styles.supportIcon}>💬</Text>
                        <Text style={styles.supportButtonTitle}>
                            {t('profile.whatsapp', 'WhatsApp')}
                        </Text>
                        <Text style={styles.supportButtonSubtitle}>
                            {t('profile.chat_with_us', 'Chat with us')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutIcon}>🚪</Text>
                <Text style={styles.logoutText}>{t('profile.logout', 'Logout')}</Text>
            </TouchableOpacity>

            <View style={styles.bottomSpacer} />
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    header: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    profileIcon: {
        marginRight: 8,
    },
    profileIconText: {
        fontSize: 24,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#111827',
    },
    card: {
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    profileSection: {
        padding: 16,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        backgroundColor: '#3b82f6',
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    avatarText: {
        fontSize: 24,
        color: '#ffffff',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    userDetails: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    abhaId: {
        fontSize: 12,
        color: '#9ca3af',
    },
    editButton: {
        padding: 4,
    },
    editText: {
        fontSize: 16,
        color: '#6b7280',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    infoItem: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },
    verifiedText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#059669',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 12,
    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    manageButton: {
        fontSize: 14,
        fontWeight: '500',
        color: '#3b82f6',
    },
    familyList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    familyMember: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    memberName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    memberRelation: {
        fontSize: 14,
        color: '#6b7280',
    },
    activeStatus: {
        backgroundColor: '#dcfce7',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    activeStatusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#166534',
    },
    schemesList: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    schemeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    schemeInfo: {
        flex: 1,
    },
    schemeName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 4,
    },
    schemeDescription: {
        fontSize: 14,
        color: '#6b7280',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    },
    linkedStatus: {
        backgroundColor: '#dbeafe',
    },
    eligibleStatus: {
        backgroundColor: '#fef3c7',
    },
    settingsSection: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    settingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    settingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    settingIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    settingSubtitle: {
        fontSize: 14,
        color: '#6b7280',
    },
    chevron: {
        fontSize: 14,
        color: '#9ca3af',
    },
    currentLanguage: {
        fontSize: 14,
        color: '#6b7280',
    },
    languageOptions: {
        marginTop: 12,
    },
    languageOption: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginBottom: 4,
    },
    selectedLanguage: {
        backgroundColor: '#3b82f6',
    },
    languageText: {
        fontSize: 14,
        color: '#6b7280',
    },
    selectedLanguageText: {
        color: '#ffffff',
        fontWeight: '500',
    },
    notificationsList: {
        marginTop: 12,
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    notificationLabel: {
        fontSize: 14,
        color: '#374151',
    },
    supportButtons: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 12,
    },
    supportButton: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderRadius: 8,
    },
    supportIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    supportButtonTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 4,
    },
    supportButtonSubtitle: {
        fontSize: 12,
        color: '#6b7280',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16,
        marginTop: 24,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#fca5a5',
        borderRadius: 8,
        backgroundColor: '#fef2f2',
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#dc2626',
    },
    bottomSpacer: {
        height: 32,
    },
});

export default Profile;