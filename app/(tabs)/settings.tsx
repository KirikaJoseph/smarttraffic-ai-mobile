import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Bell, Shield, Moon, Sun, Volume2, Map, Smartphone, CircleHelp as HelpCircle, MessageCircle, Star, LogOut, ChevronRight } from 'lucide-react-native';

export default function SettingsScreen() {
  const colors = useColors();
  const { theme, isDark, toggleTheme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [voiceAlerts, setVoiceAlerts] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [autoReroute, setAutoReroute] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          title: 'Profile',
          subtitle: 'Manage your profile information',
          onPress: () => {},
        },
        {
          icon: Shield,
          title: 'Privacy & Security',
          subtitle: 'Control your privacy settings',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: isDark ? Moon : Sun,
          title: 'Theme',
          subtitle: isDark ? 'Dark mode' : 'Light mode',
          onPress: toggleTheme,
          hasSwitch: true,
          switchValue: isDark,
        },
        {
          icon: Bell,
          title: 'Notifications',
          subtitle: 'Manage notification settings',
          onPress: () => setNotifications(!notifications),
          hasSwitch: true,
          switchValue: notifications,
        },
        {
          icon: Volume2,
          title: 'Voice Alerts',
          subtitle: 'Enable voice navigation alerts',
          onPress: () => setVoiceAlerts(!voiceAlerts),
          hasSwitch: true,
          switchValue: voiceAlerts,
        },
      ],
    },
    {
      title: 'Navigation',
      items: [
        {
          icon: Map,
          title: 'Auto-Reroute',
          subtitle: 'Automatically find better routes',
          onPress: () => setAutoReroute(!autoReroute),
          hasSwitch: true,
          switchValue: autoReroute,
        },
        {
          icon: Smartphone,
          title: 'Location Sharing',
          subtitle: 'Share location for better traffic data',
          onPress: () => setLocationSharing(!locationSharing),
          hasSwitch: true,
          switchValue: locationSharing,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          title: 'Help & FAQ',
          subtitle: 'Get help and find answers',
          onPress: () => {},
        },
        {
          icon: MessageCircle,
          title: 'Contact Support',
          subtitle: 'Reach out to our support team',
          onPress: () => {},
        },
        {
          icon: Star,
          title: 'Rate App',
          subtitle: 'Rate SmartTraffic AI on the app store',
          onPress: () => {},
        },
      ],
    },
  ];

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
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: colors.text,
      marginBottom: 16,
      marginLeft: 4,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    settingIcon: {
      marginRight: 16,
    },
    settingContent: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: colors.text,
      marginBottom: 4,
    },
    settingSubtitle: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: colors.textSecondary,
    },
    settingAction: {
      marginLeft: 12,
    },
    logoutButton: {
      backgroundColor: colors.danger,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    logoutButtonText: {
      color: 'white',
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      marginLeft: 8,
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: colors.textMuted,
      marginBottom: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <Text style={styles.headerSubtitle}>Customize your experience</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={styles.settingItem}
                onPress={item.onPress}
              >
                <item.icon size={20} color={colors.primary} style={styles.settingIcon} />
                <View style={styles.settingContent}>
                  <Text style={styles.settingTitle}>{item.title}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.settingAction}>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.switchValue}
                      onValueChange={item.onPress}
                      thumbColor={item.switchValue ? colors.primary : colors.textMuted}
                      trackColor={{ false: colors.border, true: colors.primary + '40' }}
                    />
                  ) : (
                    <ChevronRight size={20} color={colors.textMuted} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>SmartTraffic AI v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}