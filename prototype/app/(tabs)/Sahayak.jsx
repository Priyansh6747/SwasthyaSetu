import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
    Ionicons,
    MaterialIcons,
    FontAwesome5,
    Feather
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Sahayak = () => {
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState([
        {
            id: `initial-${Date.now()}`,
            text: t("sahayak.greeting") || "Hello! I'm Sahayak, your AI health assistant. How can I help you today?",
            isBot: true,
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const scrollViewRef = useRef();
    const typingAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const keyboardDidShowListener = Platform.select({
            ios: 'keyboardWillShow',
            android: 'keyboardDidShow',
        });
        const keyboardDidHideListener = Platform.select({
            ios: 'keyboardWillHide',
            android: 'keyboardDidHide',
        });

        const showListener = (event) => {
            setKeyboardHeight(event.endCoordinates.height);
        };

        const hideListener = () => {
            setKeyboardHeight(0);
        };

        const showSubscription = keyboardDidShowListener &&
            require('react-native').Keyboard.addListener(keyboardDidShowListener, showListener);
        const hideSubscription = keyboardDidHideListener &&
            require('react-native').Keyboard.addListener(keyboardDidHideListener, hideListener);

        return () => {
            showSubscription?.remove();
            hideSubscription?.remove();
        };
    }, []);

    useEffect(() => {
        if (isTyping) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(typingAnimation, {
                        toValue: 1,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(typingAnimation, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            typingAnimation.setValue(0);
        }
    }, [isTyping, typingAnimation]);

    const simulateStreamingResponse = async (userMessage) => {
        setIsTyping(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Sample health-related responses based on user input
        const responses = {
            fever: t("sahayak.responses.fever") || "For fever management:\n\n🌡️ **Monitor Temperature**: Keep track every 2-3 hours\n💧 **Stay Hydrated**: Drink plenty of water and fluids\n💊 **Medication**: Paracetamol can help (follow dosage)\n🛏️ **Rest**: Get adequate sleep and rest\n⚠️ **See Doctor**: If fever >101°F for 3+ days or severe symptoms\n\nWould you like me to help you find nearby doctors?",
            headache: t("sahayak.responses.headache") || "For headache relief:\n\n🌙 **Rest Environment**: Quiet, dark room\n🧊 **Cold Compress**: Apply to forehead for 15-20 mins\n💧 **Hydration**: Dehydration often causes headaches\n💊 **Pain Relief**: Consider mild OTC medications\n🧘 **Relaxation**: Deep breathing or meditation\n⚠️ **Seek Help**: If severe, sudden, or with vision changes",
            cough: t("sahayak.responses.cough") || "For cough management:\n\n🍯 **Honey**: Natural cough suppressant (1-2 tsp)\n💨 **Steam**: Inhale steam from hot shower/bowl\n💧 **Fluids**: Warm liquids help soothe throat\n🚫 **Avoid Irritants**: Smoke, dust, strong odors\n😴 **Sleep Position**: Elevate head while sleeping\n⚠️ **Doctor Visit**: If persists >2 weeks or blood in cough",
            appointment: t("sahayak.responses.appointment") || "📅 **Book Appointment Process**:\n\n1️⃣ Navigate to 'Appointments' section\n2️⃣ Choose your preferred doctor\n3️⃣ Select available date & time\n4️⃣ Confirm booking details\n\n🏥 **Available Options**:\n• Video consultations\n• In-person visits\n• Specialist referrals\n\nWould you like me to guide you to the appointments section?",
            medicine: t("sahayak.responses.medicine") || "💊 **Find Medicines**:\n\n🔍 **Search Process**:\n1️⃣ Use 'Find Medicines' feature\n2️⃣ Enter medicine name\n3️⃣ Check local pharmacy stock\n4️⃣ Get directions to nearest store\n\n⚠️ **Important Reminders**:\n• Always consult doctor before new medications\n• Check expiry dates\n• Follow prescribed dosages\n• Report side effects\n\nNeed help finding a specific medication?",
            symptoms: t("sahayak.responses.symptoms") || "🏥 **Symptom Assessment**:\n\nI can help you understand common symptoms and when to seek care:\n\n🔴 **Urgent Signs**: Chest pain, difficulty breathing, severe bleeding\n🟡 **Concerning**: High fever, persistent pain, unusual symptoms\n🟢 **Manageable**: Minor aches, mild cold symptoms\n\nPlease describe your symptoms in detail for better guidance.",
            emergency: t("sahayak.responses.emergency") || "🚨 **EMERGENCY SITUATIONS**:\n\nFor immediate medical emergencies:\n📞 **Call 108** (Emergency Services)\n🏥 **Go to nearest hospital**\n\n⚠️ **Emergency Signs**:\n• Chest pain/pressure\n• Difficulty breathing\n• Severe bleeding\n• Loss of consciousness\n• Severe allergic reactions\n\nThis chat is for guidance only - seek immediate help for emergencies!",
            default: t("sahayak.responses.default") || "👋 I'm here to help with your health concerns!\n\n💬 **I can assist with**:\n• Symptom guidance\n• Appointment booking\n• Medicine information\n• General health advice\n• Emergency guidance\n\n📝 **Please tell me**:\n• Your specific symptoms\n• How long you've had them\n• Any other relevant details\n\nWhat health concern can I help you with today?",
        };

        // Determine response based on user input
        const lowerInput = userMessage.toLowerCase();
        let responseText = responses.default;

        if (lowerInput.includes('fever') || lowerInput.includes('temperature') || lowerInput.includes('बुखार') || lowerInput.includes('ਬੁਖਾਰ')) {
            responseText = responses.fever;
        } else if (lowerInput.includes('headache') || lowerInput.includes('head') || lowerInput.includes('सिरदर्द') || lowerInput.includes('ਸਿਰ ਦਰਦ')) {
            responseText = responses.headache;
        } else if (lowerInput.includes('cough') || lowerInput.includes('cold') || lowerInput.includes('खांसी') || lowerInput.includes('ਖੰਘ')) {
            responseText = responses.cough;
        } else if (lowerInput.includes('appointment') || lowerInput.includes('doctor') || lowerInput.includes('book') || lowerInput.includes('डॉक्टर')) {
            responseText = responses.appointment;
        } else if (lowerInput.includes('medicine') || lowerInput.includes('medication') || lowerInput.includes('दवा') || lowerInput.includes('ਦਵਾਈ')) {
            responseText = responses.medicine;
        } else if (lowerInput.includes('emergency') || lowerInput.includes('urgent') || lowerInput.includes('help') || lowerInput.includes('आपातकाल')) {
            responseText = responses.emergency;
        } else if (lowerInput.includes('symptom') || lowerInput.includes('pain') || lowerInput.includes('hurt') || lowerInput.includes('लक्षण')) {
            responseText = responses.symptoms;
        }

        setIsTyping(false);

        // Generate unique ID for the new message
        const newMessageId = `bot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

        const newMessage = {
            id: newMessageId,
            text: '',
            isBot: true,
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages(prev => [...prev, newMessage]);

        // Stream the response character by character
        for (let i = 0; i <= responseText.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 20));
            setMessages(prev =>
                prev.map(msg =>
                    msg.id === newMessageId
                        ? { ...msg, text: responseText.slice(0, i) }
                        : msg
                )
            );
        }
    };

    const sendMessage = async () => {
        if (inputText.trim() === '') return;

        const userMessageId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const userMessage = {
            id: userMessageId,
            text: inputText,
            isBot: false,
            timestamp: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages(prev => [...prev, userMessage]);
        const messageToProcess = inputText;
        setInputText('');

        // Scroll to bottom after sending message
        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);

        // Simulate bot response
        await simulateStreamingResponse(messageToProcess);
    };

    const TypingIndicator = () => (
        <View style={styles.typingContainer}>
            <View style={styles.botMessageContainer}>
                <View style={styles.botAvatar}>
                    <FontAwesome5 name="robot" size={16} color="white" />
                </View>
                <View style={styles.botMessage}>
                    <View style={styles.typingDots}>
                        {[0, 1, 2].map((i) => (
                            <Animated.View
                                key={`typing-dot-${i}`}
                                style={[
                                    styles.dot,
                                    {
                                        opacity: typingAnimation,
                                        transform: [
                                            {
                                                translateY: typingAnimation.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [0, -8],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );

    const handleBackPress = () => {
        // Navigation back logic here
        console.log('Back pressed');
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={handleBackPress}>
                    <Ionicons name="menu" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <View style={styles.headerTitleContainer}>
                        <FontAwesome5 name="robot" size={18} color="white" style={styles.headerIcon} />
                        <Text style={styles.headerTitle}>
                            {t("sahayak.title") || "Sahayak"}
                        </Text>
                    </View>
                    <Text style={styles.headerSubtitle}>
                        {t("sahayak.subtitle") || "AI Health Assistant"}
                    </Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-circle" size={28} color="white" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={[
                        styles.messagesContent,
                        { paddingBottom: Platform.OS === 'android' ? keyboardHeight + 20 : 20 }
                    ]}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                    {messages.map((message) => (
                        <View
                            key={message.id}
                            style={[
                                styles.messageWrapper,
                                message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
                            ]}
                        >
                            {message.isBot && (
                                <View style={styles.botMessageContainer}>
                                    <View style={styles.botAvatar}>
                                        <FontAwesome5 name="robot" size={16} color="white" />
                                    </View>
                                    <View style={styles.botMessage}>
                                        <Text style={styles.botMessageText}>{message.text}</Text>
                                    </View>
                                </View>
                            )}
                            {!message.isBot && (
                                <View style={styles.userMessage}>
                                    <Text style={styles.userMessageText}>{message.text}</Text>
                                </View>
                            )}
                            <Text style={[
                                styles.timestamp,
                                message.isBot ? styles.botTimestamp : styles.userTimestamp
                            ]}>
                                {message.timestamp}
                            </Text>
                        </View>
                    ))}
                    {isTyping && <TypingIndicator />}
                </ScrollView>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TouchableOpacity style={styles.attachButton}>
                            <Ionicons name="attach" size={24} color="#666" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.micButton}>
                            <Ionicons name="mic" size={24} color="#666" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            placeholder={t("sahayak.input_placeholder") || "Type your health question..."}
                            placeholderTextColor="#999"
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            maxLength={1000}
                            returnKeyType="send"
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                sendMessage();
                            }}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive
                            ]}
                            onPress={sendMessage}
                            disabled={!inputText.trim() || isTyping}
                        >
                            <Ionicons
                                name="send"
                                size={20}
                                color={inputText.trim() ? "#2196F3" : "#ccc"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.disclaimerContainer}>
                        <MaterialIcons name="info-outline" size={12} color="#666" />
                        <Text style={styles.disclaimer}>
                            {t("sahayak.disclaimer") || "Powered by AI • Available in Hindi, Punjabi & English"}
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2196F3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    menuButton: {
        padding: 8,
        borderRadius: 20,
    },
    headerContent: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        marginRight: 8,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        marginTop: 2,
    },
    profileButton: {
        padding: 4,
    },
    messagesContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    messagesContent: {
        paddingVertical: 16,
    },
    messageWrapper: {
        marginVertical: 6,
        paddingHorizontal: 16,
    },
    botMessageWrapper: {
        alignItems: 'flex-start',
    },
    userMessageWrapper: {
        alignItems: 'flex-end',
    },
    botMessageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        maxWidth: '85%',
    },
    botAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#2196F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    botMessage: {
        backgroundColor: 'white',
        borderRadius: 20,
        borderTopLeftRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        flex: 1,
    },
    botMessageText: {
        color: '#333',
        fontSize: 16,
        lineHeight: 24,
    },
    userMessage: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        borderTopRightRadius: 4,
        paddingHorizontal: 16,
        paddingVertical: 12,
        maxWidth: '85%',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    userMessageText: {
        color: 'white',
        fontSize: 16,
        lineHeight: 24,
    },
    timestamp: {
        fontSize: 11,
        color: '#666',
        marginTop: 4,
    },
    botTimestamp: {
        marginLeft: 44,
    },
    userTimestamp: {
        textAlign: 'right',
    },
    typingContainer: {
        paddingHorizontal: 16,
        marginVertical: 6,
    },
    typingDots: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#666',
        marginHorizontal: 2,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        paddingBottom: Platform.OS === 'ios' ? 34 : 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    attachButton: {
        padding: 8,
        marginRight: 4,
    },
    micButton: {
        padding: 8,
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 22,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        maxHeight: 100,
        backgroundColor: '#f9f9f9',
        textAlignVertical: 'center',
    },
    sendButton: {
        padding: 10,
        marginLeft: 8,
        borderRadius: 20,
    },
    sendButtonActive: {
        backgroundColor: '#e3f2fd',
    },
    sendButtonInactive: {
        opacity: 0.5,
    },
    disclaimerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingBottom: 4,
    },
    disclaimer: {
        fontSize: 11,
        color: '#666',
        marginLeft: 4,
        textAlign: 'center',
    },
});

export default Sahayak;