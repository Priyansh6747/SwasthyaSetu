import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native'
import React from 'react'
import {useTranslation} from "react-i18next";
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

const Reportanalysis = () => {
    const { t } = useTranslation();

    // Sample blood report data - all values within normal ranges
    const bloodData = {
        patientInfo: {
            name: t("report.patientInfo.name") || "John Doe",
            age: 35,
            gender: t("report.patientInfo.gender") || "Male",
            patientId: t("report.patientInfo.patientId") || "NH2024001",
            reportDate: t("report.patientInfo.reportDate") || "2024-09-12",
            collectionDate: t("report.patientInfo.collectionDate") || "2024-09-11"
        },
        completeBloodCount: {
            hemoglobin: { value: 14.5, unit: t("report.units.gdl") || "g/dL", range: t("report.ranges.hemoglobin") || "13.5-17.5", status: t("report.status.normal") || "Normal" },
            rbc: { value: 4.8, unit: t("report.units.million_ul") || "million/µL", range: t("report.ranges.rbc") || "4.5-5.9", status: t("report.status.normal") || "Normal" },
            wbc: { value: 7200, unit: t("report.units.ul") || "/µL", range: t("report.ranges.wbc") || "4000-11000", status: t("report.status.normal") || "Normal" },
            platelets: { value: 285000, unit: t("report.units.ul") || "/µL", range: t("report.ranges.platelets") || "150000-450000", status: t("report.status.normal") || "Normal" },
            hematocrit: { value: 42.5, unit: t("report.units.percent") || "%", range: t("report.ranges.hematocrit") || "41-50", status: t("report.status.normal") || "Normal" }
        },
        lipidProfile: {
            totalCholesterol: { value: 185, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.cholesterol") || "<200", status: t("report.status.normal") || "Normal" },
            hdl: { value: 55, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.hdl") || ">40", status: t("report.status.normal") || "Normal" },
            ldl: { value: 115, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.ldl") || "<100", status: t("report.status.borderline") || "Borderline" },
            triglycerides: { value: 135, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.triglycerides") || "<150", status: t("report.status.normal") || "Normal" }
        },
        liverFunction: {
            alt: { value: 28, unit: t("report.units.ul") || "U/L", range: t("report.ranges.alt") || "7-56", status: t("report.status.normal") || "Normal" },
            ast: { value: 32, unit: t("report.units.ul") || "U/L", range: t("report.ranges.ast") || "10-40", status: t("report.status.normal") || "Normal" },
            bilirubin: { value: 0.8, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.bilirubin") || "0.3-1.2", status: t("report.status.normal") || "Normal" }
        },
        kidneyFunction: {
            creatinine: { value: 0.9, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.creatinine") || "0.6-1.2", status: t("report.status.normal") || "Normal" },
            bun: { value: 15, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.bun") || "7-20", status: t("report.status.normal") || "Normal" },
            uricAcid: { value: 5.2, unit: t("report.units.mgdl") || "mg/dL", range: t("report.ranges.uricAcid") || "3.4-7.0", status: t("report.status.normal") || "Normal" }
        }
    };

    // Chart configurations
    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.7,
        decimalPlaces: 1,
    };

    // Hemoglobin trend data (last 6 months)
    const hemoglobinTrend = {
        labels: t("report.months", { returnObjects: true }) || ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            data: [13.8, 14.1, 14.3, 14.2, 14.4, 14.5]
        }]
    };

    // Blood count comparison
    const bloodCountData = {
        labels: [
            t("report.parameters.rbc") || 'RBC',
            t("report.parameters.wbc") || 'WBC',
            t("report.parameters.platelets") || 'Platelets'
        ],
        datasets: [{
            data: [4.8, 7.2, 285]
        }]
    };

    // Lipid profile pie chart
    const lipidData = [
        { name: t("report.parameters.hdl") || 'HDL', population: 55, color: '#4CAF50', legendFontColor: '#333' },
        { name: t("report.parameters.ldl") || 'LDL', population: 115, color: '#FF9800', legendFontColor: '#333' },
        { name: t("report.parameters.triglycerides") || 'Triglycerides', population: 135, color: '#f44336', legendFontColor: '#333' }
    ];

    const getStatusColor = (status) => {
        switch(status) {
            case t("report.status.normal") || 'Normal': return '#4CAF50';
            case t("report.status.borderline") || 'Borderline': return '#FF9800';
            case t("report.status.high") || 'High': return '#f44336';
            case t("report.status.low") || 'Low': return '#2196F3';
            default: return '#757575';
        }
    };

    const renderParameterRow = (label, data) => (
        <View style={styles.parameterRow} key={label}>
            <Text style={styles.parameterLabel}>{label}</Text>
            <Text style={styles.parameterValue}>{data.value} {data.unit}</Text>
            <Text style={styles.parameterRange}>{data.range}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(data.status) }]}>
                <Text style={styles.statusText}>{data.status}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <FontAwesome5 name="hospital" size={24} color="#2196F3" />
                <Text style={styles.hospitalName}>{t("report.hospitalName") || "NABHA HOSPITAL"}</Text>
                <Text style={styles.subtitle}>{t("report.subtitle") || "Laboratory Report Analysis"}</Text>
            </View>

            {/* Patient Information */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="person" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.patientInfo") || "Patient Information"}</Text>
                </View>
                <View style={styles.patientInfo}>
                    <Text style={styles.patientText}>{t("report.labels.name") || "Name"}: {bloodData.patientInfo.name}</Text>
                    <Text style={styles.patientText}>{t("report.labels.age") || "Age"}: {bloodData.patientInfo.age} {t("report.labels.years") || "years"}</Text>
                    <Text style={styles.patientText}>{t("report.labels.gender") || "Gender"}: {bloodData.patientInfo.gender}</Text>
                    <Text style={styles.patientText}>{t("report.labels.patientId") || "Patient ID"}: {bloodData.patientInfo.patientId}</Text>
                    <Text style={styles.patientText}>{t("report.labels.reportDate") || "Report Date"}: {bloodData.patientInfo.reportDate}</Text>
                </View>
            </View>

            {/* Overall Status */}
            <View style={styles.overallStatus}>
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
                <Text style={styles.overallStatusText}>{t("report.overallStatus") || "Overall Result: NORMAL"}</Text>
                <Text style={styles.overallStatusSubtext}>{t("report.overallStatusSubtext") || "All major parameters within acceptable ranges"}</Text>
            </View>

            {/* Hemoglobin Trend Chart */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="trending-up" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.hemoglobinTrend") || "Hemoglobin Trend (6 Months)"}</Text>
                </View>
                <LineChart
                    data={hemoglobinTrend}
                    width={screenWidth - 40}
                    height={200}
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            </View>

            {/* Complete Blood Count */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="opacity" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.cbc") || "Complete Blood Count (CBC)"}</Text>
                </View>
                <View style={styles.parametersContainer}>
                    {renderParameterRow(t("report.parameters.hemoglobin") || 'Hemoglobin', bloodData.completeBloodCount.hemoglobin)}
                    {renderParameterRow(t("report.parameters.rbc") || 'RBC Count', bloodData.completeBloodCount.rbc)}
                    {renderParameterRow(t("report.parameters.wbc") || 'WBC Count', bloodData.completeBloodCount.wbc)}
                    {renderParameterRow(t("report.parameters.platelets") || 'Platelet Count', bloodData.completeBloodCount.platelets)}
                    {renderParameterRow(t("report.parameters.hematocrit") || 'Hematocrit', bloodData.completeBloodCount.hematocrit)}
                </View>
            </View>

            {/* Blood Count Bar Chart */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="bar-chart" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.bloodCount") || "Blood Count Comparison"}</Text>
                </View>
                <BarChart
                    data={bloodCountData}
                    width={screenWidth - 40}
                    height={200}
                    chartConfig={chartConfig}
                    style={styles.chart}
                    showValuesOnTopOfBars
                />
            </View>

            {/* Lipid Profile */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="favorite" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.lipidProfile") || "Lipid Profile"}</Text>
                </View>
                <View style={styles.parametersContainer}>
                    {renderParameterRow(t("report.parameters.totalCholesterol") || 'Total Cholesterol', bloodData.lipidProfile.totalCholesterol)}
                    {renderParameterRow(t("report.parameters.hdl") || 'HDL Cholesterol', bloodData.lipidProfile.hdl)}
                    {renderParameterRow(t("report.parameters.ldl") || 'LDL Cholesterol', bloodData.lipidProfile.ldl)}
                    {renderParameterRow(t("report.parameters.triglycerides") || 'Triglycerides', bloodData.lipidProfile.triglycerides)}
                </View>

                {/* Lipid Profile Pie Chart */}
                <PieChart
                    data={lipidData}
                    width={screenWidth - 40}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    style={styles.chart}
                />
            </View>

            {/* Liver Function */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <FontAwesome5 name="prescription-bottle" size={18} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.liverFunction") || "Liver Function Tests"}</Text>
                </View>
                <View style={styles.parametersContainer}>
                    {renderParameterRow(t("report.parameters.alt") || 'ALT (SGPT)', bloodData.liverFunction.alt)}
                    {renderParameterRow(t("report.parameters.ast") || 'AST (SGOT)', bloodData.liverFunction.ast)}
                    {renderParameterRow(t("report.parameters.bilirubin") || 'Total Bilirubin', bloodData.liverFunction.bilirubin)}
                </View>
            </View>

            {/* Kidney Function */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="filter-alt" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.kidneyFunction") || "Kidney Function Tests"}</Text>
                </View>
                <View style={styles.parametersContainer}>
                    {renderParameterRow(t("report.parameters.creatinine") || 'Serum Creatinine', bloodData.kidneyFunction.creatinine)}
                    {renderParameterRow(t("report.parameters.bun") || 'Blood Urea Nitrogen', bloodData.kidneyFunction.bun)}
                    {renderParameterRow(t("report.parameters.uricAcid") || 'Uric Acid', bloodData.kidneyFunction.uricAcid)}
                </View>
            </View>

            {/* Doctor's Note */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="note" size={20} color="#2196F3" />
                    <Text style={styles.sectionTitle}>{t("report.sections.clinicalInterpretation") || "Clinical Interpretation"}</Text>
                </View>
                <View style={styles.doctorNote}>
                    <Text style={styles.doctorNoteText}>
                        {t("report.doctorNote") || `• All blood parameters are within normal reference ranges\n• LDL cholesterol is borderline - recommend dietary modifications\n• Continue current lifestyle and regular monitoring\n• Next follow-up recommended in 6 months`}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>{t("report.footer.department") || "NABHA HOSPITAL - Department of Laboratory Medicine"}</Text>
                <Text style={styles.footerText}>{t("report.footer.certification") || "Certified by CAP & NABL | ISO 15189:2012"}</Text>
                <Text style={styles.footerSubtext}>{t("report.footer.generated") || "This report is computer generated and does not require signature"}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        backgroundColor: '#2196F3',
        padding: 20,
        alignItems: 'center',
    },
    hospitalName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#ffffff',
        opacity: 0.9,
        marginTop: 4,
    },
    section: {
        margin: 15,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#F5F5F5',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    patientInfo: {
        padding: 15,
    },
    patientText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    overallStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E8',
        margin: 15,
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    overallStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginLeft: 8,
        flex: 1,
    },
    overallStatusSubtext: {
        fontSize: 12,
        color: '#666',
        position: 'absolute',
        bottom: 8,
        left: 47,
    },
    parametersContainer: {
        padding: 15,
    },
    parameterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    parameterLabel: {
        flex: 2,
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    parameterValue: {
        flex: 1.5,
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    parameterRange: {
        flex: 1.5,
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    statusBadge: {
        flex: 1,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        alignItems: 'center',
    },
    statusText: {
        fontSize: 10,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    chart: {
        marginVertical: 8,
        borderRadius: 8,
    },
    doctorNote: {
        padding: 15,
        backgroundColor: '#F8F9FA',
    },
    doctorNoteText: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
    },
    footer: {
        backgroundColor: '#F5F5F5',
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginBottom: 2,
    },
    footerSubtext: {
        fontSize: 10,
        color: '#999',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default Reportanalysis;