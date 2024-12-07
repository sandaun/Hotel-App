import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';

const Header = ({
  title,
  showBackButton,
  onFilterPress,
  selectedFilter,
}: {
  title: string;
  showBackButton: boolean;
  onFilterPress?: () => void;
  selectedFilter?: string;
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {title}
        </Text>

        {!showBackButton && onFilterPress ? (
          <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>
              Filter:{' '}
              {selectedFilter === 'stars'
                ? '🌟'
                : selectedFilter === 'price'
                ? '💰'
                : '🚫'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.primary,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
    width: '25%',
  },
  backButtonText: {
    color: colors.background,
    fontSize: 18,
  },
  title: {
    textAlign: 'center',
    color: colors.background,
    fontSize: 20,
    fontWeight: 'bold',
    width: '50%',
  },
  filterButton: {
    padding: 8,
    width: '25%',
    borderWidth: 1,
    borderColor: colors.background,
    borderRadius: 8,
  },
  filterButtonText: {
    color: colors.background,
    fontSize: 16,
  },
  placeholder: {
    width: '25%',
  },
});

export default Header;
