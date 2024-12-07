import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';

const FilterButton = ({
  label,
  isSelected,
  onPress,
}: {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterOption, isSelected && styles.activeOption]}
      onPress={onPress}>
      <Text style={[styles.filterText, isSelected && styles.activeText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 16,
    color: colors.text,
  },
  activeText: {
    color: colors.background,
    fontWeight: 'bold',
  },
});

export default FilterButton;
