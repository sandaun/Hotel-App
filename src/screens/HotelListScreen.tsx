import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';
import {fetchHotels} from '../services/api';
import FilterModal from '../components/FilterModal';

const HotelListScreen = ({navigation}) => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
        setFilteredHotels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  const applyFilter = filter => {
    if (filter === 'stars') {
      setFilteredHotels([...hotels].sort((a, b) => b.stars - a.stars));
    } else if (filter === 'price') {
      setFilteredHotels([...hotels].sort((a, b) => a.price - b.price));
    }
    setFilterVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading hotels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Filtrar" onPress={() => setFilterVisible(true)} />

      <FlatList
        data={filteredHotels}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('HotelDetails', {hotel: item})}>
            <View style={styles.hotelCard}>
              <Text style={styles.hotelName}>{item.name}</Text>
              <Text>{item.location.city}</Text>
              <Text>{item.stars} stars</Text>
              <Text>
                {item.price} {item.currency}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal de filtres */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={applyFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hotelCard: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HotelListScreen;
