import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { Sun, Cloud, CloudRain, Wind, Droplets, Eye, Thermometer, Gauge, TriangleAlert as AlertTriangle, RefreshCw } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WeatherScreen() {
  const colors = useColors();
  const [weatherData, setWeatherData] = useState({
    current: {
      temperature: 24,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 10,
      pressure: 1013,
      feelsLike: 26,
    },
    alerts: [
      {
        id: 1,
        type: 'warning',
        title: 'Heavy Rain Expected',
        message: 'Heavy rainfall expected between 3-6 PM. Consider alternative routes.',
        severity: 'medium',
      },
    ],
    hourly: [
      { time: '12 PM', temp: 24, condition: 'sunny', precipitation: 0 },
      { time: '1 PM', temp: 25, condition: 'sunny', precipitation: 0 },
      { time: '2 PM', temp: 26, condition: 'cloudy', precipitation: 10 },
      { time: '3 PM', temp: 23, condition: 'rainy', precipitation: 80 },
      { time: '4 PM', temp: 22, condition: 'rainy', precipitation: 90 },
      { time: '5 PM', temp: 21, condition: 'rainy', precipitation: 70 },
      { time: '6 PM', temp: 22, condition: 'cloudy', precipitation: 20 },
      { time: '7 PM', temp: 23, condition: 'cloudy', precipitation: 10 },
    ],
    daily: [
      { day: 'Today', high: 26, low: 21, condition: 'rainy', precipitation: 80 },
      { day: 'Tomorrow', high: 28, low: 23, condition: 'sunny', precipitation: 10 },
      { day: 'Wednesday', high: 27, low: 22, condition: 'cloudy', precipitation: 30 },
      { day: 'Thursday', high: 25, low: 20, condition: 'rainy', precipitation: 70 },
      { day: 'Friday', high: 29, low: 24, condition: 'sunny', precipitation: 5 },
    ],
  });

  const getWeatherIcon = (condition: string, size: number = 24) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={size} color={colors.warning} />;
      case 'cloudy':
        return <Cloud size={size} color={colors.textSecondary} />;
      case 'rainy':
        return <CloudRain size={size} color={colors.info} />;
      default:
        return <Sun size={size} color={colors.warning} />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return colors.danger;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.info;
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerLeft: {
      flex: 1,
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
    refreshButton: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
    },
    currentWeatherCard: {
      backgroundColor: colors.surface,
      borderRadius: 20,
      padding: 24,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
    currentWeatherHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    currentTemp: {
      fontSize: 48,
      fontFamily: 'Inter-Bold',
      color: colors.text,
    },
    currentCondition: {
      fontSize: 18,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    feelsLike: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textMuted,
    },
    weatherStats: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
    },
    statItem: {
      alignItems: 'center',
      width: (width - 88) / 3,
      marginBottom: 12,
    },
    statIcon: {
      marginBottom: 4,
    },
    statValue: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
    },
    statLabel: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    alertsSection: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 12,
    },
    alertCard: {
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
    alertHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    alertTitle: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginLeft: 8,
    },
    alertMessage: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
      lineHeight: 20,
    },
    hourlySection: {
      marginBottom: 20,
    },
    hourlyScroll: {
      paddingLeft: 20,
    },
    hourlyItem: {
      alignItems: 'center',
      marginRight: 16,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 12,
      minWidth: 70,
      borderWidth: 1,
      borderColor: colors.border,
    },
    hourlyTime: {
      fontSize: 12,
      fontFamily: 'Inter-Medium',
      color: colors.textSecondary,
      marginBottom: 8,
    },
    hourlyTemp: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginTop: 8,
      marginBottom: 4,
    },
    hourlyPrecipitation: {
      fontSize: 11,
      fontFamily: 'Inter-Regular',
      color: colors.info,
    },
    dailySection: {
      marginBottom: 20,
    },
    dailyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dailyLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    dailyDay: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginLeft: 12,
      flex: 1,
    },
    dailyTemps: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    dailyHigh: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginRight: 8,
    },
    dailyLow: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    dailyPrecipitation: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.info,
      marginLeft: 12,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Weather</Text>
          <Text style={styles.headerSubtitle}>Current conditions & forecast</Text>
        </View>
        <TouchableOpacity style={styles.refreshButton}>
          <RefreshCw size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.currentWeatherCard}>
          <View style={styles.currentWeatherHeader}>
            <View>
              <Text style={styles.currentTemp}>{weatherData.current.temperature}°</Text>
              <Text style={styles.currentCondition}>{weatherData.current.condition}</Text>
              <Text style={styles.feelsLike}>Feels like {weatherData.current.feelsLike}°</Text>
            </View>
            <Cloud size={64} color={colors.textSecondary} />
          </View>
          
          <View style={styles.weatherStats}>
            <View style={styles.statItem}>
              <Droplets size={20} color={colors.info} style={styles.statIcon} />
              <Text style={styles.statValue}>{weatherData.current.humidity}%</Text>
              <Text style={styles.statLabel}>Humidity</Text>
            </View>
            <View style={styles.statItem}>
              <Wind size={20} color={colors.secondary} style={styles.statIcon} />
              <Text style={styles.statValue}>{weatherData.current.windSpeed} km/h</Text>
              <Text style={styles.statLabel}>Wind</Text>
            </View>
            <View style={styles.statItem}>
              <Eye size={20} color={colors.warning} style={styles.statIcon} />
              <Text style={styles.statValue}>{weatherData.current.visibility} km</Text>
              <Text style={styles.statLabel}>Visibility</Text>
            </View>
            <View style={styles.statItem}>
              <Gauge size={20} color={colors.danger} style={styles.statIcon} />
              <Text style={styles.statValue}>{weatherData.current.pressure} hPa</Text>
              <Text style={styles.statLabel}>Pressure</Text>
            </View>
          </View>
        </View>

        {weatherData.alerts.length > 0 && (
          <View style={styles.alertsSection}>
            <Text style={styles.sectionTitle}>Weather Alerts</Text>
            {weatherData.alerts.map((alert) => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <AlertTriangle size={18} color={getAlertColor(alert.severity)} />
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                </View>
                <Text style={styles.alertMessage}>{alert.message}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.hourlySection}>
          <Text style={styles.sectionTitle}>Hourly Forecast</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hourlyScroll}
          >
            {weatherData.hourly.map((hour, index) => (
              <View key={index} style={styles.hourlyItem}>
                <Text style={styles.hourlyTime}>{hour.time}</Text>
                {getWeatherIcon(hour.condition, 20)}
                <Text style={styles.hourlyTemp}>{hour.temp}°</Text>
                <Text style={styles.hourlyPrecipitation}>{hour.precipitation}%</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.dailySection}>
          <Text style={styles.sectionTitle}>5-Day Forecast</Text>
          {weatherData.daily.map((day, index) => (
            <View key={index} style={styles.dailyItem}>
              <View style={styles.dailyLeft}>
                {getWeatherIcon(day.condition, 20)}
                <Text style={styles.dailyDay}>{day.day}</Text>
              </View>
              <Text style={styles.dailyPrecipitation}>{day.precipitation}%</Text>
              <View style={styles.dailyTemps}>
                <Text style={styles.dailyHigh}>{day.high}°</Text>
                <Text style={styles.dailyLow}>{day.low}°</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}