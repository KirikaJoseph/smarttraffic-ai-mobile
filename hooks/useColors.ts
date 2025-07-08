import { useTheme } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';

export const useColors = () => {
  const { isDark } = useTheme();
  return isDark ? Colors.dark : Colors.light;
};