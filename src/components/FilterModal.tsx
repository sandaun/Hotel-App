import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';

const FilterModal = ({visible, onClose, onApply}) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Choose a filter</Text>

          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'stars' && styles.activeOption,
            ]}
            onPress={() => setSelectedFilter('stars')}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'stars' && styles.activeText,
              ]}>
              🌟 Stars
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'price' && styles.activeOption,
            ]}
            onPress={() => setSelectedFilter('price')}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === 'price' && styles.activeText,
              ]}>
              💰 Price
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === null && styles.activeOption,
            ]}
            onPress={() => setSelectedFilter(null)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === null && styles.activeText,
              ]}>
              🚫 No filter
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onApply(selectedFilter)}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: colors.header,
  },
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FilterModal;
