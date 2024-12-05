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

const HotelListScreen = ({navigation}) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHotels = async () => {
      try {
        const data = await fetchHotels();
        setHotels(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading hotels...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={hotels}
      keyExtractor={item => item.name}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('HotelDetails', {hotel: item})}>
          <View style={styles.hotelCard}>
            <Text style={styles.hotelName}>{item.name}</Text>
            <Text>{item.city}</Text>
            <Text>{item.stars} stars</Text>
            <Text>
              {item.price.amount} {item.price.currency}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
