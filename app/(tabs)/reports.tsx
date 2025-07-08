import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { TriangleAlert as AlertTriangle, Car, Construction, Zap, MapPin, Camera, Send, Clock, Users } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ReportsScreen() {
  const colors = useColors();
  const [selectedIncident, setSelectedIncident] = useState('');
  const [description, setDescription] = useState('');
  const [recentReports, setRecentReports] = useState([
    {
      id: 1,
      type: 'Accident',
      location: 'Main St & 5th Ave',
      time: '10 mins ago',
      reports: 5,
      status: 'active',
    },
    {
      id: 2,
      type: 'Construction',
      location: 'Highway 101',
      time: '25 mins ago',
      reports: 12,
      status: 'verified',
    },
    {
      id: 3,
      type: 'Hazard',
      location: 'Oak Street',
      time: '1 hour ago',
      reports: 3,
      status: 'resolved',
    },
  ]);

  const incidentTypes = [
    { id: 'accident', label: 'Accident', icon: Car, color: colors.danger },
    { id: 'construction', label: 'Construction', icon: Construction, color: colors.warning },
    { id: 'hazard', label: 'Hazard', icon: AlertTriangle, color: colors.danger },
    { id: 'weather', label: 'Weather', icon: Zap, color: colors.info },
  ];

  const submitReport = () => {
    if (!selectedIncident || !description.trim()) {
      Alert.alert('Error', 'Please select an incident type and provide a description.');
      return;
    }

    // Here you would typically send the report to your backend
    Alert.alert(
      'Report Submitted',
      'Thank you for reporting this incident. Authorities have been notified.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedIncident('');
            setDescription('');
          },
        },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return colors.danger;
      case 'verified':
        return colors.warning;
      case 'resolved':
        return colors.secondary;
      default:
        return colors.textSecondary;
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
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    incidentGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    incidentCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      width: (width - 60) / 2,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    incidentCardSelected: {
      borderColor: colors.primary,
      borderWidth: 2,
      backgroundColor: colors.primary + '10',
    },
    incidentIcon: {
      marginBottom: 8,
    },
    incidentLabel: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      textAlign: 'center',
    },
    inputContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 16,
    },
    textInput: {
      padding: 16,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
      minHeight: 100,
      textAlignVertical: 'top',
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    actionButton: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      flex: 1,
      marginHorizontal: 4,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginTop: 4,
    },
    submitButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    reportCard: {
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
    reportHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    reportType: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    reportStatus: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      backgroundColor: colors.surface,
    },
    reportStatusText: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      textTransform: 'capitalize',
    },
    reportLocation: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    reportLocationText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginLeft: 4,
    },
    reportFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    reportTime: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reportTimeText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textMuted,
      marginLeft: 4,
    },
    reportCount: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reportCountText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textMuted,
      marginLeft: 4,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Incident Reports</Text>
        <Text style={styles.headerSubtitle}>Report traffic incidents</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Report an Incident</Text>
          
          <View style={styles.incidentGrid}>
            {incidentTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.incidentCard,
                  selectedIncident === type.id && styles.incidentCardSelected,
                ]}
                onPress={() => setSelectedIncident(type.id)}
              >
                <type.icon
                  size={24}
                  color={selectedIncident === type.id ? colors.primary : type.color}
                  style={styles.incidentIcon}
                />
                <Text style={styles.incidentLabel}>{type.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Describe the incident (location, details, etc.)"
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <MapPin size={20} color={colors.primary} />
              <Text style={styles.actionButtonText}>Add Location</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Camera size={20} color={colors.secondary} />
              <Text style={styles.actionButtonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
            <Send size={20} color="white" />
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          
          {recentReports.map((report) => (
            <View key={report.id} style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportType}>{report.type}</Text>
                <View style={[styles.reportStatus, { backgroundColor: getStatusColor(report.status) + '20' }]}>
                  <Text style={[styles.reportStatusText, { color: getStatusColor(report.status) }]}>
                    {report.status}
                  </Text>
                </View>
              </View>
              
              <View style={styles.reportLocation}>
                <MapPin size={14} color={colors.textSecondary} />
                <Text style={styles.reportLocationText}>{report.location}</Text>
              </View>
              
              <View style={styles.reportFooter}>
                <View style={styles.reportTime}>
                  <Clock size={12} color={colors.textMuted} />
                  <Text style={styles.reportTimeText}>{report.time}</Text>
                </View>
                <View style={styles.reportCount}>
                  <Users size={12} color={colors.textMuted} />
                  <Text style={styles.reportCountText}>{report.reports} reports</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}