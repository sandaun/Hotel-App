import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const FilterModal = ({visible, onClose, onApply}) => {
  const [selectedFilter, setSelectedFilter] = useState('stars');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Filtra per:</Text>
          <TouchableOpacity onPress={() => setSelectedFilter('stars')}>
            <Text
              style={[
                styles.option,
                selectedFilter === 'stars' && styles.selectedOption,
              ]}>
              Stars
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedFilter('price')}>
            <Text
              style={[
                styles.option,
                selectedFilter === 'price' && styles.selectedOption,
              ]}>
              Price
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button title="Cancelar" onPress={onClose} />
            <Button title="Aplicar" onPress={() => onApply(selectedFilter)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  option: {
    fontSize: 16,
    paddingVertical: 8,
  },
  selectedOption: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default FilterModal;
