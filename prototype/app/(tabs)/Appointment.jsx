import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';

const Appointment = () => {
    const { t } = useTranslation();
    const [selectedStep, setSelectedStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    // Mock data for upcoming appointments
    const upcomingAppointments = [
        {
            id: 1,
            doctorName: "Dr. Rajesh Kumar",
            hospital: "Civil Hospital Nabha",
            date: "Today",
            time: "2:30 PM",
            type: "Video Consultation",
            avatar: "👨‍⚕️"
        },
        {
            id: 2,
            doctorName: "Dr. Priya Sharma",
            hospital: "District Hospital",
            date: "Tomorrow",
            time: "10:00 AM",
            type: "In-person",
            avatar: "👩‍⚕️"
        }
    ];

    // Mock data for available doctors
    const availableDoctors = [
        {
            id: 1,
            name: "Civil Hospital Nabha",
            distance: "2.5 km",
            type: "Government",
            status: "Open",
            doctors: 15,
            rating: 4.2
        },
        {
            id: 2,
            name: "Max Hospital",
            distance: "3.8 km",
            type: "Private",
            status: "Open",
            doctors: 25,
            rating: 4.5
        },
        {
            id: 3,
            name: "Apollo Clinic",
            distance: "1.2 km",
            type: "Private",
            status: "Closed",
            doctors: 8,
            rating: 4.1
        }
    ];

    // Mock data for time slots
    const timeSlots = [
        "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
        "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
    ];

    const AppointmentCard = ({ appointment }) => (
        <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatar}>{appointment.avatar}</Text>
                </View>
                <View style={styles.appointmentInfo}>
                    <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                    <Text style={styles.hospitalName}>{appointment.hospital}</Text>
                </View>
                <View style={styles.appointmentTime}>
                    <Text style={styles.dateText}>{appointment.date}</Text>
                    <Text style={styles.timeText}>{appointment.time}</Text>
                </View>
            </View>
            <View style={styles.appointmentActions}>
                <View style={[styles.consultationType,
                    appointment.type === "Video Consultation" ? styles.videoConsultation : styles.inPersonConsultation]}>
                    <Text style={styles.consultationText}>{appointment.type}</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>{t("appointments.join_appointment")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const StepIndicator = () => (
        <View style={styles.stepIndicator}>
            {[1, 2, 3, 4].map((step) => (
                <View key={step} style={styles.stepContainer}>
                    <View style={[styles.stepCircle, selectedStep >= step && styles.activeStep]}>
                        <Text style={[styles.stepText, selectedStep >= step && styles.activeStepText]}>
                            {step}
                        </Text>
                    </View>
                    {step < 4 && <View style={[styles.stepLine, selectedStep > step && styles.activeStepLine]} />}
                </View>
            ))}
        </View>
    );

    const DoctorCard = ({ doctor }) => (
        <TouchableOpacity
            style={[styles.doctorCard, selectedDoctor?.id === doctor.id && styles.selectedDoctorCard]}
            onPress={() => setSelectedDoctor(doctor)}
        >
            <View style={styles.doctorCardHeader}>
                <Text style={styles.doctorCardName}>{doctor.name}</Text>
                <View style={[styles.statusBadge, doctor.status === "Open" ? styles.openStatus : styles.closedStatus]}>
                    <Text style={styles.statusText}>{doctor.status}</Text>
                </View>
            </View>
            <View style={styles.doctorCardInfo}>
                <View style={styles.infoItem}>
                    <Ionicons name="location" size={12} color="#666" />
                    <Text style={styles.infoText}>{doctor.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MaterialIcons name="local-hospital" size={12} color="#666" />
                    <Text style={styles.infoText}>{doctor.type}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MaterialIcons name="people" size={12} color="#666" />
                    <Text style={styles.infoText}>{doctor.doctors} {t("appointments.doctors")}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.infoText}>{doctor.rating}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const TimeSlotCard = ({ slot }) => (
        <TouchableOpacity
            style={[styles.timeSlot, selectedTimeSlot === slot && styles.selectedTimeSlot]}
            onPress={() => setSelectedTimeSlot(slot)}
        >
            <Text style={[styles.timeSlotText, selectedTimeSlot === slot && styles.selectedTimeSlotText]}>
                {slot}
            </Text>
        </TouchableOpacity>
    );

    const renderBookingStep = () => {
        switch(selectedStep) {
            case 1:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("appointments.select_doctor")}</Text>
                        <FlatList
                            data={availableDoctors}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <DoctorCard doctor={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                        {selectedDoctor && (
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => setSelectedStep(2)}
                            >
                                <Text style={styles.continueButtonText}>{t("appointments.continue")}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("appointments.select_date")}</Text>
                        <View style={styles.calendarPlaceholder}>
                            <MaterialIcons name="calendar-today" size={48} color="#ccc" />
                            <Text style={styles.placeholderText}>{t("appointments.calendar_placeholder")}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => setSelectedStep(3)}
                        >
                            <Text style={styles.continueButtonText}>{t("appointments.continue")}</Text>
                        </TouchableOpacity>
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("appointments.select_time")}</Text>
                        <View style={styles.timeSlotsContainer}>
                            {timeSlots.map((slot, index) => (
                                <TimeSlotCard key={index} slot={slot} />
                            ))}
                        </View>
                        {selectedTimeSlot && (
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => setSelectedStep(4)}
                            >
                                <Text style={styles.continueButtonText}>{t("appointments.continue")}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case 4:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("appointments.confirm_booking")}</Text>
                        <View style={styles.confirmationCard}>
                            <Text style={styles.confirmationTitle}>{t("appointments.booking_summary")}</Text>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>{t("appointments.hospital")}:</Text>
                                <Text style={styles.summaryValue}>{selectedDoctor?.name}</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>{t("appointments.date")}:</Text>
                                <Text style={styles.summaryValue}>Tomorrow</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>{t("appointments.time")}:</Text>
                                <Text style={styles.summaryValue}>{selectedTimeSlot}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.confirmButton}>
                            <Text style={styles.confirmButtonText}>{t("appointments.confirm_booking")}</Text>
                        </TouchableOpacity>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <MaterialIcons name="calendar-today" size={24} color="#2196F3" />
                    <Text style={styles.headerTitle}>{t("appointments.title")}</Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Upcoming Appointments */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("appointments.upcoming_appointments")}</Text>
                {upcomingAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </View>

            {/* Book New Appointment */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("appointments.book_new_appointment")}</Text>

                <StepIndicator />

                {renderBookingStep()}
            </View>
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
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    filterButton: {
        padding: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    appointmentCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatar: {
        fontSize: 24,
    },
    appointmentInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    hospitalName: {
        fontSize: 14,
        color: '#666',
    },
    appointmentTime: {
        alignItems: 'flex-end',
    },
    dateText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    timeText: {
        fontSize: 14,
        color: '#666',
    },
    appointmentActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    consultationType: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    videoConsultation: {
        backgroundColor: '#E8F5E8',
    },
    inPersonConsultation: {
        backgroundColor: '#FFF3E0',
    },
    consultationText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
    joinButton: {
        backgroundColor: '#2196F3',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeStep: {
        backgroundColor: '#2196F3',
    },
    stepText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },
    activeStepText: {
        color: '#FFFFFF',
    },
    stepLine: {
        width: 40,
        height: 2,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 8,
    },
    activeStepLine: {
        backgroundColor: '#2196F3',
    },
    stepContent: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    doctorCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedDoctorCard: {
        borderColor: '#2196F3',
        borderWidth: 2,
    },
    doctorCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    doctorCardName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    openStatus: {
        backgroundColor: '#E8F5E8',
    },
    closedStatus: {
        backgroundColor: '#FFEBEE',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
    },
    doctorCardInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoText: {
        fontSize: 12,
        color: '#666',
    },
    timeSlotsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },
    timeSlot: {
        width: '30%',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
        marginBottom: 8,
    },
    selectedTimeSlot: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },
    timeSlotText: {
        fontSize: 14,
        color: '#333',
    },
    selectedTimeSlotText: {
        color: '#FFFFFF',
        fontWeight: '500',
    },
    calendarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 20,
    },
    placeholderText: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 8,
    },
    confirmationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    confirmationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    continueButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Appointment;