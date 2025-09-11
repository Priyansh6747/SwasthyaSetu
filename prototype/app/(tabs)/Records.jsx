import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Animated,
    Dimensions,
    Image,
    Alert,
    Platform
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
    AntDesign,
    Feather,
    MaterialCommunityIcons
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import {router} from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Records = () => {
    const { t } = useTranslation();
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
    const [filterVisible, setFilterVisible] = useState(false);
    const [sortBy, setSortBy] = useState('date');

    // Family members data
    const [familyMembers] = useState([
        { id: 1, name: 'Shaurya', relation: 'Self', age: 28, avatar: '👨' },
        { id: 2, name: 'Rajesh Kumar', relation: 'Father', age: 55, avatar: '👨' },
        { id: 3, name: 'Sunita Devi', relation: 'Mother', age: 52, avatar: '👩' },
    ]);

    // Separate health records for each family member
    const [profileHealthRecords, setProfileHealthRecords] = useState({
        1: [ // Shaurya's records
            {
                id: 1,
                type: 'Blood Pressure',
                subtype: 'Medication',
                doctor: 'Dr. Rajesh Kumar',
                hospital: 'Civil Hospital Nabha',
                date: '10/01/2024',
                icon: 'file-text',
                iconColor: '#4A90E2'
            },
            {
                id: 2,
                type: 'Complete Blood Count',
                subtype: null,
                doctor: 'Dr. Priya Sharma',
                hospital: 'District Hospital',
                date: '05/01/2024',
                icon: 'activity',
                iconColor: '#50C878'
            },
            {
                id: 3,
                type: 'Blood Pressure Reading',
                subtype: null,
                doctor: null,
                hospital: null,
                date: '03/01/2024',
                icon: 'heart',
                iconColor: '#FF6B6B'
            },
        ],
        2: [ // Rajesh Kumar's records
            {
                id: 4,
                type: 'Diabetes Check',
                subtype: 'Regular Monitoring',
                doctor: 'Dr. Amit Singh',
                hospital: 'City Hospital',
                date: '12/01/2024',
                icon: 'activity',
                iconColor: '#FF8C00'
            },
            {
                id: 5,
                type: 'Heart Check-up',
                subtype: 'Annual Review',
                doctor: 'Dr. Neha Gupta',
                hospital: 'Heart Care Center',
                date: '08/01/2024',
                icon: 'heart',
                iconColor: '#FF6B6B'
            },
        ],
        3: [ // Sunita Devi's records
            {
                id: 6,
                type: 'Bone Density Test',
                subtype: 'Osteoporosis Screening',
                doctor: 'Dr. Kavita Sharma',
                hospital: 'Women\'s Health Center',
                date: '15/01/2024',
                icon: 'file-text',
                iconColor: '#9B59B6'
            },
            {
                id: 7,
                type: 'Blood Pressure',
                subtype: 'Hypertension Management',
                doctor: 'Dr. Rajesh Kumar',
                hospital: 'Civil Hospital Nabha',
                date: '11/01/2024',
                icon: 'heart',
                iconColor: '#FF6B6B'
            },
            {
                id: 8,
                type: 'Thyroid Function',
                subtype: 'Regular Check',
                doctor: 'Dr. Priya Sharma',
                hospital: 'District Hospital',
                date: '07/01/2024',
                icon: 'activity',
                iconColor: '#50C878'
            },
        ],
    });

    // Separate stats for each family member
    const [profileStats, setProfileStats] = useState({
        1: { prescriptions: 5, labReports: 3, visits: 12 },
        2: { prescriptions: 8, labReports: 4, visits: 15 },
        3: { prescriptions: 6, labReports: 5, visits: 18 },
    });

    const [selectedMember, setSelectedMember] = useState(familyMembers[0]);

    // Get current member's data
    const currentHealthRecords = profileHealthRecords[selectedMember.id] || [];
    const currentStats = profileStats[selectedMember.id] || { prescriptions: 0, labReports: 0, visits: 0 };

    useEffect(() => {
        if (modalVisible) {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 11
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,
                duration: 250,
                useNativeDriver: true
            }).start();
        }
    }, [modalVisible]);

    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
                Alert.alert(
                    t('records.permission_required'),
                    t('records.permission_message'),
                    [{ text: t('buttons.ok'), style: 'default' }]
                );
                return false;
            }
        }
        return true;
    };

    const handleTakePhoto = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled) {
                handleUploadSuccess(result.assets[0]);
            }
        } catch (error) {
            Alert.alert(t('records.error'), t('records.camera_error'));
        }
        setModalVisible(false);
    };

    const handleUploadFromDevice = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/*', 'application/pdf'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                handleUploadSuccess(result.assets[0]);
            }
        } catch (error) {
            Alert.alert(t('records.error'), t('records.upload_error'));
        }
        setModalVisible(false);
    };

    const handleUploadSuccess = (document) => {
        // Create new record for the selected member
        const newRecord = {
            id: Date.now(), // Simple ID generation
            type: 'New Document',
            subtype: 'Uploaded File',
            doctor: null,
            hospital: null,
            date: new Date().toLocaleDateString('en-GB'),
            icon: document.type?.includes('pdf') ? 'file-text' : 'image',
            iconColor: '#4A90E2',
            documentUri: document.uri
        };

        // Update records for the selected member
        setProfileHealthRecords(prev => ({
            ...prev,
            [selectedMember.id]: [newRecord, ...(prev[selectedMember.id] || [])]
        }));

        // Update stats for the selected member
        setProfileStats(prev => ({
            ...prev,
            [selectedMember.id]: {
                ...prev[selectedMember.id],
                prescriptions: prev[selectedMember.id]?.prescriptions + 1 || 1
            }
        }));

        Alert.alert(
            t('records.upload_success'),
            `${t('records.document_uploaded')} for ${selectedMember.name}`,
            [{ text: t('buttons.ok'), style: 'default' }]
        );

        console.log('Document uploaded for', selectedMember.name, ':', document);
    };

    const handleDeleteRecord = (recordId) => {
        Alert.alert(
            t('records.delete_record'),
            t('records.delete_confirmation'),
            [
                { text: t('buttons.cancel'), style: 'cancel' },
                {
                    text: t('buttons.delete'),
                    style: 'destructive',
                    onPress: () => {
                        setProfileHealthRecords(prev => ({
                            ...prev,
                            [selectedMember.id]: prev[selectedMember.id].filter(record => record.id !== recordId)
                        }));

                        // Update stats
                        setProfileStats(prev => ({
                            ...prev,
                            [selectedMember.id]: {
                                ...prev[selectedMember.id],
                                prescriptions: Math.max(0, prev[selectedMember.id]?.prescriptions - 1 || 0)
                            }
                        }));
                    }
                }
            ]
        );
    };

    const renderFamilyMember = (member) => (
        <TouchableOpacity
            key={member.id}
            style={[
                styles.memberCard,
                selectedMember.id === member.id && styles.selectedMemberCard
            ]}
            onPress={() => setSelectedMember(member)}
        >
            <Text style={styles.memberAvatar}>{member.avatar}</Text>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRelation}>{member.relation}</Text>
            <Text style={styles.memberAge}>Age {member.age}</Text>
            {/* Show record count indicator */}
            <View style={styles.recordCountBadge}>
                <Text style={styles.recordCountText}>
                    {profileHealthRecords[member.id]?.length || 0}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderHealthRecord = (record) => (
        <TouchableOpacity key={record.id} style={styles.recordCard} onPress={()=>router.push('../stack/reportanalysis')}>
            <View style={styles.recordIconContainer}>
                <Feather name={record.icon} size={24} color={record.iconColor} />
            </View>
            <View style={styles.recordContent}>
                <View style={styles.recordHeader}>
                    <Text style={styles.recordTitle}>{record.type}</Text>
                    <View style={styles.recordDateContainer}>
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text style={styles.recordDate}>{record.date}</Text>
                    </View>
                </View>
                {record.subtype && (
                    <Text style={styles.recordSubtype}>{record.subtype}</Text>
                )}
                {record.doctor && (
                    <Text style={styles.recordDoctor}>{record.doctor}</Text>
                )}
                {record.hospital && (
                    <Text style={styles.recordHospital}>{record.hospital}</Text>
                )}
            </View>
            <View style={styles.recordActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <Feather name="download" size={18} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteRecord(record.id)}
                >
                    <Feather name="trash-2" size={18} color="#FF6B6B" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Family Members Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>{t('records.family_members')}</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.familyScroll}
                    >
                        {familyMembers.map(renderFamilyMember)}
                    </ScrollView>
                </View>

                {/* Selected Member Header */}
                <View style={styles.selectedMemberHeader}>
                    <Text style={styles.selectedMemberTitle}>
                        {selectedMember.name}'s Records
                    </Text>
                    <Text style={styles.selectedMemberSubtitle}>
                        {selectedMember.relation} • Age {selectedMember.age}
                    </Text>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Feather name="file-text" size={20} color="#4A90E2" />
                        <Text style={styles.statNumber}>{currentStats.prescriptions}</Text>
                        <Text style={styles.statLabel}>{t('records.prescriptions')}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <MaterialCommunityIcons name="test-tube" size={20} color="#50C878" />
                        <Text style={styles.statNumber}>{currentStats.labReports}</Text>
                        <Text style={styles.statLabel}>{t('records.lab_reports')}</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <FontAwesome5 name="stethoscope" size={20} color="#9B59B6" />
                        <Text style={styles.statNumber}>{currentStats.visits}</Text>
                        <Text style={styles.statLabel}>{t('records.visits')}</Text>
                    </View>
                </View>

                {/* Health Records Section */}
                <View style={styles.section}>
                    <View style={styles.recordsHeader}>
                        <Text style={styles.sectionTitle}>{t('records.health_records')}</Text>
                        <View style={styles.headerActions}>
                            <TouchableOpacity
                                style={styles.filterButton}
                                onPress={() => setFilterVisible(!filterVisible)}
                            >
                                <Text style={styles.filterText}>{t('records.filter')}</Text>
                                <MaterialIcons name="filter-list" size={18} color="#007AFF" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sortButton}>
                                <Text style={styles.sortText}>{t('records.sort')}</Text>
                                <MaterialIcons name="sort" size={18} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {currentHealthRecords.length > 0 ? (
                        currentHealthRecords.map(renderHealthRecord)
                    ) : (
                        <View style={styles.emptyState}>
                            <Feather name="folder" size={48} color="#ccc" />
                            <Text style={styles.emptyText}>
                                {t('records.empty')} for {selectedMember.name}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Add some bottom padding for scroll */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Action Button */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.8}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>

            {/* Upload Modal */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <Animated.View
                        style={[
                            styles.modalContent,
                            {
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <TouchableOpacity activeOpacity={1}>
                            <View style={styles.modalHandle} />
                            <Text style={styles.modalTitle}>
                                {t('records.add_record')} for {selectedMember.name}
                            </Text>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={handleTakePhoto}
                            >
                                <View style={styles.optionIcon}>
                                    <Feather name="camera" size={24} color="#007AFF" />
                                </View>
                                <View style={styles.optionText}>
                                    <Text style={styles.optionTitle}>{t('records.take_photo')}</Text>
                                    <Text style={styles.optionSubtitle}>{t('records.take_photo_desc')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={handleUploadFromDevice}
                            >
                                <View style={styles.optionIcon}>
                                    <Feather name="upload" size={24} color="#007AFF" />
                                </View>
                                <View style={styles.optionText}>
                                    <Text style={styles.optionTitle}>{t('records.upload_from_device')}</Text>
                                    <Text style={styles.optionSubtitle}>{t('records.upload_desc')}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelText}>{t('buttons.cancel')}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 40,
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 20,
        marginBottom: 15,
        color: '#333',
    },
    familyScroll: {
        paddingHorizontal: 20,
    },
    memberCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 15,
        marginRight: 12,
        alignItems: 'center',
        width: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    selectedMemberCard: {
        borderColor: '#007AFF',
        borderWidth: 2,
    },
    memberAvatar: {
        fontSize: 28,
        marginBottom: 8,
    },
    memberName: {
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    memberRelation: {
        fontSize: 11,
        color: '#666',
        marginTop: 2,
    },
    memberAge: {
        fontSize: 11,
        color: '#999',
        marginTop: 2,
    },
    recordCountBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordCountText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    selectedMemberHeader: {
        marginHorizontal: 20,
        marginVertical: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 12,
    },
    selectedMemberTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: 'white',
    },
    selectedMemberSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.8)',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 15,
    },
    recordsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 12,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    filterText: {
        fontSize: 14,
        color: '#007AFF',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sortText: {
        fontSize: 14,
        color: '#007AFF',
    },
    recordCard: {
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 12,
        borderRadius: 12,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    recordIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 10,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    recordContent: {
        flex: 1,
    },
    recordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    recordTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    recordDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    recordDate: {
        fontSize: 12,
        color: '#666',
    },
    recordSubtype: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    recordDoctor: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    recordHospital: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    recordActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 8,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 12,
        textAlign: 'center',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
        minHeight: 320,
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#ddd',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 24,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f4f8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    optionText: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    optionSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    cancelButton: {
        marginTop: 20,
        paddingVertical: 14,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '500',
    },
});

export default Records;