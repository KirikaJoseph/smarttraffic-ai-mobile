import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Search, MapPin, Navigation as NavigationIcon, Route, Clock, Fuel, TriangleAlert as AlertTriangle, RefreshCw } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function NavigationScreen() {
  const colors = useColors();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Fastest Route',
      distance: '12.5 km',
      duration: '18 mins',
      traffic: 'Light',
      fuelCost: '$3.20',
      recommended: true,
    },
    {
      id: 2,
      name: 'Scenic Route',
      distance: '15.2 km',
      duration: '25 mins',
      traffic: 'Medium',
      fuelCost: '$3.85',
      recommended: false,
    },
    {
      id: 3,
      name: 'Highway Route',
      distance: '14.8 km',
      duration: '22 mins',
      traffic: 'Heavy',
      fuelCost: '$3.75',
      recommended: false,
    },
  ]);

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
    searchSection: {
      marginBottom: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    inputIcon: {
      marginRight: 12,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.text,
    },
    searchButton: {
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
    searchButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    routesSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
    },
    routeCard: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 20,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    recommendedRoute: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    routeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    routeName: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    recommendedBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
    },
    recommendedText: {
      color: 'white',
      fontSize: 12,
      fontFamily: 'Inter-Medium',
    },
    routeStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statIcon: {
      marginBottom: 4,
    },
    statValue: {
      fontSize: 14,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    routeActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    actionButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 4,
      alignItems: 'center',
    },
    actionButtonSecondary: {
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonText: {
      color: 'white',
      fontSize: 14,
      fontFamily: 'Inter-Medium',
    },
    actionButtonTextSecondary: {
      color: colors.text,
    },
    trafficIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    trafficText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      marginLeft: 4,
    },
  });

  const getTrafficColor = (traffic: string) => {
    switch (traffic) {
      case 'Light':
        return colors.secondary;
      case 'Medium':
        return colors.warning;
      case 'Heavy':
        return colors.danger;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Navigation</Text>
        <Text style={styles.headerSubtitle}>Plan your optimal route</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <View style={styles.inputContainer}>
            <MapPin size={20} color={colors.primary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="From location"
              placeholderTextColor={colors.textMuted}
              value={fromLocation}
              onChangeText={setFromLocation}
            />
          </View>

          <View style={styles.inputContainer}>
            <NavigationIcon size={20} color={colors.secondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="To location"
              placeholderTextColor={colors.textMuted}
              value={toLocation}
              onChangeText={setToLocation}
            />
          </View>

          <TouchableOpacity style={styles.searchButton}>
            <Search size={20} color="white" />
            <Text style={styles.searchButtonText}>Find Routes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.routesSection}>
          <Text style={styles.sectionTitle}>Available Routes</Text>
          
          {routes.map((route) => (
            <View 
              key={route.id} 
              style={[
                styles.routeCard,
                route.recommended && styles.recommendedRoute
              ]}
            >
              <View style={styles.routeHeader}>
                <Text style={styles.routeName}>{route.name}</Text>
                {route.recommended && (
                  <View style={styles.recommendedBadge}>
                    <Text style={styles.recommendedText}>Recommended</Text>
                  </View>
                )}
              </View>

              <View style={styles.routeStats}>
                <View style={styles.statItem}>
                  <Route size={16} color={colors.primary} style={styles.statIcon} />
                  <Text style={styles.statValue}>{route.distance}</Text>
                  <Text style={styles.statLabel}>Distance</Text>
                </View>
                <View style={styles.statItem}>
                  <Clock size={16} color={colors.secondary} style={styles.statIcon} />
                  <Text style={styles.statValue}>{route.duration}</Text>
                  <Text style={styles.statLabel}>Duration</Text>
                </View>
                <View style={styles.statItem}>
                  <Fuel size={16} color={colors.warning} style={styles.statIcon} />
                  <Text style={styles.statValue}>{route.fuelCost}</Text>
                  <Text style={styles.statLabel}>Fuel Cost</Text>
                </View>
              </View>

              <View style={styles.trafficIndicator}>
                <AlertTriangle size={14} color={getTrafficColor(route.traffic)} />
                <Text style={styles.trafficText}>
                  {route.traffic} traffic conditions
                </Text>
              </View>

              <View style={styles.routeActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Start Navigation</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
                  <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
                    Preview
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}