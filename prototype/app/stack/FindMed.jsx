import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from "react-i18next";

const FindMed = () => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [medicines] = useState([
        {
            id: 1,
            name: 'Paracetamol 500mg',
            genericName: 'Acetaminophen',
            price: 15,
            inStock: true,
            pharmacy: 'MedPlus Pharmacy',
            distance: 0.8,
            alternatives: ['Crocin', 'Dolo 650']
        },
        {
            id: 2,
            name: 'Amoxicillin 250mg',
            genericName: 'Amoxicillin',
            price: 45,
            inStock: false,
            pharmacy: 'Apollo Pharmacy',
            distance: 1.2,
            alternatives: ['Augmentin', 'Clamp']
        }
    ]);

    const renderMedicine = ({item}) => (
        <View style={styles.medicineCard}>
            <View style={styles.medicineHeader}>
                <View style={styles.medicineInfo}>
                    <Text style={styles.medicineName}>{item.name}</Text>
                    <Text style={styles.genericName}>{item.genericName}</Text>
                </View>
                <View style={styles.priceSection}>
                    <Text style={styles.price}>
                        {t("findmed.medicine.price") || "₹"}{item.price}
                    </Text>
                    <Text style={[
                        styles.stockStatus,
                        {color: item.inStock ? '#4CAF50' : '#F44336'}
                    ]}>
                        {item.inStock
                            ? t("findmed.medicine.inStock") || "In Stock"
                            : t("findmed.medicine.outOfStock") || "Out of Stock"
                        }
                    </Text>
                </View>
            </View>

            <View style={styles.pharmacyInfo}>
                <Text style={styles.pharmacyName}>{item.pharmacy}</Text>
                <Text style={styles.distance}>
                    {item.distance} {t("findmed.pharmacy.distance") || "km"}
                </Text>
            </View>

            <Text style={styles.alternatives}>
                {t("findmed.medicine.alternatives") || "Alternatives"}: {item.alternatives.join(', ')}
            </Text>

            <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.viewPharmacyBtn}>
                    <Text style={styles.viewPharmacyText}>
                        {t("findmed.medicine.viewPharmacy") || "View Pharmacy"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reserveBtn}>
                    <Text style={styles.reserveText}>
                        {t("findmed.medicine.reserve") || "Reserve"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backButton}>
                        ← {t("findmed.header.back") || "Back"}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    🔍 {t("findmed.header.title") || "Find Medicine"}
                </Text>
            </View>

            {/* Search Section */}
            <View style={styles.searchSection}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={t("findmed.search.placeholder") || "Search medicine name..."}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />

                <View style={styles.searchOptions}>
                    <TouchableOpacity style={styles.voiceBtn}>
                        <Text>🎤 {t("findmed.search.voice") || "Voice"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.scanBtn}>
                        <Text>📷 {t("findmed.search.scanPrescription") || "Scan Prescription"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filter Section */}
            <View style={styles.filterSection}>
                <TouchableOpacity style={[styles.filterBtn, styles.activeFilter]}>
                    <Text style={styles.activeFilterText}>
                        📍 {t("findmed.filters.nearest") || "Nearest"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                    <Text>₹ {t("findmed.filters.lowestPrice") || "Lowest Price"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}>
                    <Text>✅ {t("findmed.filters.inStock") || "In Stock"}</Text>
                </TouchableOpacity>
            </View>

            {/* Results Section */}
            <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>
                    {t("findmed.results.title") || "Search Results"}
                </Text>
                <Text style={styles.resultsCount}>
                    {medicines.length} {t("findmed.results.medicinesFound") || "medicines found"}
                </Text>
            </View>

            {/* Medicine List */}
            <FlatList
                data={medicines}
                renderItem={renderMedicine}
                keyExtractor={item => item.id.toString()}
                style={styles.medicineList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 10
    },
    backButton: {
        fontSize: 16,
        color: '#007AFF',
        marginRight: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    searchSection: {
        marginBottom: 20
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10
    },
    searchOptions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    voiceBtn: {
        backgroundColor: '#E3F2FD',
        padding: 10,
        borderRadius: 20,
        flex: 0.45
    },
    scanBtn: {
        backgroundColor: '#F3E5F5',
        padding: 10,
        borderRadius: 20,
        flex: 0.45
    },
    filterSection: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between'
    },
    filterBtn: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        flex: 0.3,
        alignItems: 'center'
    },
    activeFilter: {
        backgroundColor: '#007AFF'
    },
    activeFilterText: {
        color: 'white',
        fontWeight: 'bold'
    },
    resultsHeader: {
        marginBottom: 15
    },
    resultsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    resultsCount: {
        fontSize: 14,
        color: '#666',
        marginTop: 5
    },
    medicineList: {
        flex: 1
    },
    medicineCard: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2
    },
    medicineHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    medicineInfo: {
        flex: 1
    },
    medicineName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    genericName: {
        fontSize: 14,
        color: '#666',
        marginTop: 2
    },
    priceSection: {
        alignItems: 'flex-end'
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    stockStatus: {
        fontSize: 12,
        marginTop: 2
    },
    pharmacyInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    pharmacyName: {
        fontSize: 14,
        color: '#666'
    },
    distance: {
        fontSize: 14,
        color: '#666'
    },
    alternatives: {
        fontSize: 12,
        color: '#888',
        marginBottom: 12
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewPharmacyBtn: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        flex: 0.48
    },
    viewPharmacyText: {
        textAlign: 'center',
        color: '#333'
    },
    reserveBtn: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        flex: 0.48
    },
    reserveText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    }
});

export default FindMed;