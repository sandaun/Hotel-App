import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {fetchHotels} from '../services/api';
import FilterModal from '../components/FilterModal';
import colors from '../styles/colors';
import HotelCard from '../components/HotelCard';
import {useHeader} from '../contexts/HotelContext';
import {useFocusEffect} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Hotel} from '../types/types';

type HotelListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HotelList'
>;

const HotelListScreen: React.FC<HotelListScreenProps> = ({navigation}) => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const {setHeaderConfig} = useHeader();

  useFocusEffect(
    useCallback(() => {
      setHeaderConfig({
        title: 'Hotels App',
        onFilterPress: () => setFilterVisible(true),
        selectedFilter,
        showBackButton: false,
      });
    }, [selectedFilter, setHeaderConfig]),
  );

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

  const applyFilter = (filter: string) => {
    setSelectedFilter(filter);

    if (!filter) {
      setFilteredHotels(hotels);
    } else if (filter === 'stars') {
      setFilteredHotels([...hotels].sort((a, b) => b.stars - a.stars));
    } else if (filter === 'price') {
      setFilteredHotels([...hotels].sort((a, b) => a.price - b.price));
    } else if (filter === 'score') {
      setFilteredHotels(
        [...hotels].sort((a, b) => b.userRating - a.userRating),
      );
    }

    setFilterVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loader} testID="loading-indicator">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text>Loading hotels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="hotel-list-screen">
      <FlatList
        data={filteredHotels}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({item}) => (
          <HotelCard
            hotel={item}
            onPress={() => navigation.navigate('HotelDetails', {hotel: item})}
          />
        )}
      />

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
  listContainer: {
    paddingBottom: 24,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HotelListScreen;
