import {View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList} from 'react-native'
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import {router} from "expo-router";

const Appointment = () => {
    const { t } = useTranslation();
    const [selectedStep, setSelectedStep] = useState(1);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    // Mock data for upcoming appointments
    const upcomingAppointments = [
        {
            id: 1,
            doctorName: "Dr. Rajesh Kumar",
            hospital: "Civil Hospital Nabha",
            date: t("appointments.today") || "Today",
            time: "2:30 PM",
            type: t("appointments.video_consultation") || "Video Consultation",
            avatar: "👨‍⚕️"
        },
        {
            id: 2,
            doctorName: "Dr. Priya Sharma",
            hospital: "District Hospital",
            date: t("appointments.tomorrow") || "Tomorrow",
            time: "10:00 AM",
            type: t("appointments.in_person") || "In-person",
            avatar: "👩‍⚕️"
        }
    ];

    // Mock data for available hospitals
    const availableHospitals = [
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
            name: "District Hospital",
            distance: "5.2 km",
            type: "Government",
            status: "Open",
            doctors: 25,
            rating: 4.0
        },
        {
            id: 3,
            name: "Lifeline Medical Center",
            distance: "3.1 km",
            type: "Private",
            status: "Open",
            doctors: 8,
            rating: 4.5
        }
    ];

    // Mock data for doctors based on selected hospital
    const getDoctorsByHospital = (hospitalId) => {
        const doctorsData = {
            1: [ // Civil Hospital Nabha
                {
                    id: 1,
                    name: "Dr. Rajesh Kumar",
                    specialty: "General Medicine",
                    consultationType: "Online consultation",
                    status: "Available",
                    avatar: "RK"
                },
                {
                    id: 2,
                    name: "Dr. Priya Sharma",
                    specialty: "Pediatrics",
                    consultationType: "In-person consultation",
                    status: "Busy",
                    nextAvailable: "2:30 PM",
                    avatar: "PS"
                },
                {
                    id: 3,
                    name: "Dr. Amit Singh",
                    specialty: "Cardiology",
                    consultationType: "Both consultation",
                    status: "Next: 2:30 PM",
                    avatar: "AS"
                }
            ],
            2: [ // District Hospital
                {
                    id: 4,
                    name: "Dr. Sunita Gupta",
                    specialty: "General Medicine",
                    consultationType: "Online consultation",
                    status: "Available",
                    avatar: "SG"
                }
            ],
            3: [ // Lifeline Medical Center
                {
                    id: 5,
                    name: "Dr. Vikram Patel",
                    specialty: "Orthopedics",
                    consultationType: "In-person consultation",
                    status: "Available",
                    avatar: "VP"
                }
            ]
        };
        return doctorsData[hospitalId] || [];
    };

    // Mock data for time slots
    const timeSlots = [
        "9:00 AM", "10:30 AM", "12:00 PM",
        "2:30 PM", "4:00 PM", "5:30 PM"
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
                    <Text style={styles.joinButtonText}>{t("appointments.join_appointment") || "Join"}</Text>
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

    const HospitalCard = ({ hospital }) => (
        <TouchableOpacity
            style={[styles.hospitalCard, selectedHospital?.id === hospital.id && styles.selectedHospitalCard]}
            onPress={() => setSelectedHospital(hospital)}
        >
            <View style={styles.hospitalCardHeader}>
                <Text style={styles.hospitalCardName}>{hospital.name}</Text>
                <View style={[styles.statusBadge, hospital.status === "Open" ? styles.openStatus : styles.closedStatus]}>
                    <Text style={styles.statusText}>{hospital.status}</Text>
                </View>
            </View>
            <View style={styles.hospitalCardInfo}>
                <View style={styles.infoItem}>
                    <Ionicons name="location" size={12} color="#666" />
                    <Text style={styles.infoText}>{hospital.distance}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MaterialIcons name="local-hospital" size={12} color="#666" />
                    <Text style={styles.infoText}>{hospital.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const DoctorCard = ({ doctor }) => (
        <TouchableOpacity
            style={[styles.doctorCard, selectedDoctor?.id === doctor.id && styles.selectedDoctorCard]}
            onPress={() => setSelectedDoctor(doctor)}
        >
            <View style={styles.doctorCardHeader}>
                <View style={styles.doctorAvatar}>
                    <Text style={styles.doctorAvatarText}>{doctor.avatar}</Text>
                </View>
                <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>{doctor.name}</Text>
                    <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                    <Text style={styles.consultationType}>{doctor.consultationType}</Text>
                </View>
                <View style={[styles.doctorStatusBadge,
                    doctor.status === "Available" ? styles.availableStatus :
                        doctor.status === "Busy" ? styles.busyStatus : styles.nextStatus]}>
                    <Text style={styles.doctorStatusText}>{doctor.status}</Text>
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
                        <Text style={styles.stepTitle}>Select Hospital</Text>
                        <FlatList
                            data={availableHospitals}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <HospitalCard hospital={item} />}
                            showsVerticalScrollIndicator={false}
                        />
                        {selectedHospital && (
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => setSelectedStep(2)}
                            >
                                <Text style={styles.continueButtonText}>{t("appointments.continue") || "Continue"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Select Doctor</Text>
                        {selectedHospital ? (
                            <FlatList
                                data={getDoctorsByHospital(selectedHospital.id)}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => <DoctorCard doctor={item} />}
                                showsVerticalScrollIndicator={false}
                            />
                        ) : (
                            <Text style={styles.placeholderText}>Please select a hospital first</Text>
                        )}
                        {selectedDoctor && (
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => setSelectedStep(3)}
                            >
                                <Text style={styles.continueButtonText}>{t("appointments.continue") || "Continue"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Select Time</Text>
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
                                <Text style={styles.continueButtonText}>{t("appointments.continue") || "Continue"}</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                );
            case 4:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Payment & Confirmation</Text>
                        <View style={styles.confirmationCard}>
                            <Text style={styles.confirmationTitle}>Appointment Summary</Text>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Doctor:</Text>
                                <Text style={styles.summaryValue}>{selectedDoctor?.name}</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Date & Time:</Text>
                                <Text style={styles.summaryValue}>Today, {selectedTimeSlot}</Text>
                            </View>
                            <View style={styles.summaryItem}>
                                <Text style={styles.summaryLabel}>Consultation Fee:</Text>
                                <Text style={styles.summaryValue}>₹200</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.payWithUPIButton} onPress={()=>{router.push('../stack/BookConfirm')}}>
                            <Text style={styles.payWithUPIButtonText}>Pay with UPI</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.payAtHospitalButton}>
                            <Text style={styles.payAtHospitalButtonText}>Pay at Hospital</Text>
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
                    <Text style={styles.headerTitle}>{t("appointments.title") || "Appointments"}</Text>
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <MaterialIcons name="filter-list" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Upcoming Appointments */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("appointments.upcoming_appointments") || "Upcoming Appointments"}</Text>
                {upcomingAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </View>

            {/* Book New Appointment */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t("appointments.book_new_appointment") || "Book New Appointment"}</Text>

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
    hospitalCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    selectedHospitalCard: {
        borderColor: '#2196F3',
        borderWidth: 2,
    },
    hospitalCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    hospitalCardName: {
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
    hospitalCardInfo: {
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
        alignItems: 'center',
    },
    doctorAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    doctorAvatarText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    doctorInfo: {
        flex: 1,
    },
    doctorSpecialty: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    doctorStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    availableStatus: {
        backgroundColor: '#E8F5E8',
    },
    busyStatus: {
        backgroundColor: '#FFEBEE',
    },
    nextStatus: {
        backgroundColor: '#FFF3E0',
    },
    doctorStatusText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
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
    confirmationCard: {
        backgroundColor: '#F5F5F5',
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
        borderBottomColor: '#E0E0E0',
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
    payWithUPIButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    payWithUPIButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    payAtHospitalButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    payAtHospitalButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
    },
    placeholderText: {
        fontSize: 16,
        color: '#ccc',
        textAlign: 'center',
        marginTop: 40,
    },
});

export default Appointment;