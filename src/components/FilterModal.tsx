import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import FilterButton from './FilterButton';
import colors from '../styles/colors';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filter: string) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Choose a filter</Text>

          <FilterButton
            label="🌟 Stars"
            isSelected={selectedFilter === 'stars'}
            onPress={() => setSelectedFilter('stars')}
          />
          <FilterButton
            label="💰 Price"
            isSelected={selectedFilter === 'price'}
            onPress={() => setSelectedFilter('price')}
          />
          <FilterButton
            label="🤩 Users score"
            isSelected={selectedFilter === 'score'}
            onPress={() => setSelectedFilter('score')}
          />
          <FilterButton
            label="🚫 No filter"
            isSelected={selectedFilter === ''}
            onPress={() => setSelectedFilter('')}
          />

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
