import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import {useTranslation} from "react-i18next";

//Fallback Translation object for the congratulations screen
const Congrats = {
    "title": "Congratulations!",
    "subtitle": "Your appointment has been booked successfully",
    "appointmentDetails": "Appointment Details",
    "doctorName": "Dr. Rajesh Kumar",
    "specialty": "General Medicine",
    "dateLabel": "Date",
    "todayLabel": "Today",
    "timeLabel": "Time",
    "hospitalLabel": "Hospital",
    "hospitalName": "Civil Hospital Nabha",
    "addToCalendar": "Add to Calendar 📅"
};

const BookConfirm = () => {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {/* Success Icon */}
            <View style={styles.successIcon}>
                <View style={styles.checkmarkContainer}>
                    <Text style={styles.checkmark}>✓</Text>
                </View>
            </View>

            {/* Celebration Emoji */}
            <Text style={styles.celebrationEmoji}>🎉</Text>

            {/* Title and Subtitle */}
            <Text style={styles.title}>
                {t("title") || Congrats.title}
            </Text>
            <Text style={styles.subtitle}>
                {t("subtitle") || Congrats.subtitle}
            </Text>

            {/* Appointment Details Card */}
            <View style={styles.detailsCard}>
                <Text style={styles.detailsTitle}>
                    {t("appointmentDetails") || Congrats.appointmentDetails}
                </Text>

                {/* Doctor Info */}
                <View style={styles.detailRow}>
                    <View style={styles.iconContainer} style={[styles.iconContainer, {backgroundColor: '#4FC3F7'}]}>
                        <Text style={styles.iconText}>👨‍⚕️</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailValue}>
                            {t("doctorName") || Congrats.doctorName}
                        </Text>
                        <Text style={styles.detailLabel}>
                            {t("specialty") || Congrats.specialty}
                        </Text>
                    </View>
                </View>

                {/* Date Info */}
                <View style={styles.detailRow}>
                    <View style={[styles.iconContainer, {backgroundColor: '#4CAF50'}]}>
                        <Text style={styles.iconText}>📅</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailValue}>
                            {t("todayLabel") || Congrats.todayLabel}
                        </Text>
                        <Text style={styles.detailLabel}>
                            {t("dateLabel") || Congrats.dateLabel}
                        </Text>
                    </View>
                </View>

                {/* Time Info */}
                <View style={styles.detailRow}>
                    <View style={[styles.iconContainer, {backgroundColor: '#E91E63'}]}>
                        <Text style={styles.iconText}>🕙</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailValue}>10:30 AM</Text>
                        <Text style={styles.detailLabel}>
                            {t("timeLabel") || Congrats.timeLabel}
                        </Text>
                    </View>
                </View>

                {/* Hospital Info */}
                <View style={styles.detailRow}>
                    <View style={[styles.iconContainer, {backgroundColor: '#FF9800'}]}>
                        <Text style={styles.iconText}>🏥</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailValue}>
                            {t("hospitalName") || Congrats.hospitalName}
                        </Text>
                        <Text style={styles.detailLabel}>
                            {t("hospitalLabel") || Congrats.hospitalLabel}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Add to Calendar Button */}
            <TouchableOpacity style={styles.calendarButton} activeOpacity={0.8}>
                <Text style={styles.calendarButtonText}>
                    {t("addToCalendar") || Congrats.addToCalendar}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        paddingHorizontal: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    checkmarkContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    celebrationEmoji: {
        fontSize: 24,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 22,
    },
    detailsCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        width: '100%',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    detailsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingVertical: 4,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconText: {
        fontSize: 18,
    },
    detailContent: {
        flex: 1,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    detailLabel: {
        fontSize: 14,
        color: '#666',
    },
    calendarButton: {
        backgroundColor: '#4FC3F7',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#4FC3F7',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    calendarButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BookConfirm;