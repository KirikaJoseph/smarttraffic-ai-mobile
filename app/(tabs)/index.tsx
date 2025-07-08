import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { MapPin, Clock, TrendingUp, CircleAlert as AlertCircle, Car, Zap, Mic, MicOff } from 'lucide-react-native';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colors = useColors();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [trafficData, setTrafficData] = useState({
    currentSpeed: 45,
    averageSpeed: 38,
    congestionLevel: 'Medium',
    estimatedDelay: '8 mins',
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const toggleVoiceAssistant = () => {
    if (Platform.OS !== 'web') {
      // Implement voice assistant functionality for mobile
      setIsListening(!isListening);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 16,
    },
    headerTitle: {
      fontSize: 28,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    locationCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    locationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    locationTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginLeft: 8,
    },
    locationText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 20,
    },
    trafficGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    trafficCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      width: (width - 60) / 2,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    trafficCardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    trafficCardTitle: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginLeft: 6,
    },
    trafficCardValue: {
      fontSize: 20,
      fontFamily: 'Inter-Bold',
      color: colors.text,
      marginBottom: 4,
    },
    trafficCardSubtitle: {
      fontSize: 11,
      fontFamily: 'Inter-Regular',
      color: colors.textMuted,
    },
    insightsSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    insightCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    insightHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    insightTitle: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginLeft: 8,
      flex: 1,
    },
    insightDescription: {
      fontSize: 13,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 18,
    },
    voiceButton: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: colors.primary,
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    voiceButtonActive: {
      backgroundColor: colors.danger,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartTraffic AI</Text>
        <Text style={styles.headerSubtitle}>Real-time traffic insights</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <MapPin size={20} color={colors.primary} />
            <Text style={styles.locationTitle}>Current Location</Text>
          </View>
          <Text style={styles.locationText}>
            {location 
              ? `${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`
              : 'Getting your location...'}
          </Text>
        </View>

        <View style={styles.trafficGrid}>
          <View style={styles.trafficCard}>
            <View style={styles.trafficCardHeader}>
              <Car size={16} color={colors.primary} />
              <Text style={styles.trafficCardTitle}>CURRENT SPEED</Text>
            </View>
            <Text style={styles.trafficCardValue}>{trafficData.currentSpeed}</Text>
            <Text style={styles.trafficCardSubtitle}>km/h</Text>
          </View>

          <View style={styles.trafficCard}>
            <View style={styles.trafficCardHeader}>
              <TrendingUp size={16} color={colors.secondary} />
              <Text style={styles.trafficCardTitle}>AVERAGE SPEED</Text>
            </View>
            <Text style={styles.trafficCardValue}>{trafficData.averageSpeed}</Text>
            <Text style={styles.trafficCardSubtitle}>km/h</Text>
          </View>

          <View style={styles.trafficCard}>
            <View style={styles.trafficCardHeader}>
              <AlertCircle size={16} color={colors.warning} />
              <Text style={styles.trafficCardTitle}>CONGESTION</Text>
            </View>
            <Text style={styles.trafficCardValue}>{trafficData.congestionLevel}</Text>
            <Text style={styles.trafficCardSubtitle}>Level</Text>
          </View>

          <View style={styles.trafficCard}>
            <View style={styles.trafficCardHeader}>
              <Clock size={16} color={colors.danger} />
              <Text style={styles.trafficCardTitle}>EST. DELAY</Text>
            </View>
            <Text style={styles.trafficCardValue}>{trafficData.estimatedDelay}</Text>
            <Text style={styles.trafficCardSubtitle}>Minutes</Text>
          </View>
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          
          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Zap size={18} color={colors.primary} />
              <Text style={styles.insightTitle}>Optimal Route Available</Text>
            </View>
            <Text style={styles.insightDescription}>
              A faster route via Highway 101 is available, saving you 12 minutes.
            </Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <AlertCircle size={18} color={colors.warning} />
              <Text style={styles.insightTitle}>Traffic Building Up</Text>
            </View>
            <Text style={styles.insightDescription}>
              Heavy traffic expected on Main Street in the next 15 minutes.
            </Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <TrendingUp size={18} color={colors.secondary} />
              <Text style={styles.insightTitle}>Best Departure Time</Text>
            </View>
            <Text style={styles.insightDescription}>
              Leave in 10 minutes for optimal traffic conditions.
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.voiceButton, isListening && styles.voiceButtonActive]}
        onPress={toggleVoiceAssistant}
      >
        {isListening ? (
          <MicOff size={24} color="white" />
        ) : (
          <Mic size={24} color="white" />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}