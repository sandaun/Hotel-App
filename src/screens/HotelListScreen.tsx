import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {fetchHotels} from '../services/api';
import FilterModal from '../components/FilterModal';
import colors from '../styles/colors';
import HotelCard from '../components/HotelCard';

const HotelListScreen = ({navigation}) => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

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
    setSelectedFilter(filter);

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
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterVisible(true)}>
        <Text style={styles.filterButtonText}>
          Filter: {selectedFilter === 'stars' ? '⭐️' : '💰'}
        </Text>
      </TouchableOpacity>
      <View style={styles.separator} />

      <FlatList
        data={filteredHotels}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <HotelCard
            hotel={item}
            onPress={() => navigation.navigate('HotelDetails', {hotel: item})}
          />
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    elevation: 2,
    borderColor: colors.border,
    borderWidth: 1,
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.header,
  },
  hotelText: {
    fontSize: 14,
    color: colors.text,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  ctaText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 16,
  },
  filterButtonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 16,
  },
  // separator: {
  //   height: 1, // Alçada de la línia
  //   backgroundColor: colors.border, // Color subtil per la línia
  //   shadowColor: '#000', // Ombra per iOS
  //   shadowOffset: {width: 0, height: 2},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 3,
  //   elevation: 2, // Ombra per Android
  // },
});

export default HotelListScreen;
