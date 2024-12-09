import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ValidatedImage from './ValidatedImage';
import colors from '../styles/colors';
import {Hotel} from '../types/types';
import {formatHotelName} from '../utils/utils';

type HotelCardProps = {
  hotel: Hotel;
  onPress: () => void;
};

const HotelCard: React.FC<HotelCardProps> = ({hotel, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <ValidatedImage uri={hotel.gallery?.[0]} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.hotelName}>{formatHotelName(hotel.name)}</Text>
          <Text style={styles.hotelCity}>{hotel.location.city}</Text>
          <Text style={styles.hotelDetails}>
            {`🌟 ${hotel.stars} stars | 💰 ${hotel.price} ${hotel.currency} | 🤩 ${hotel.userRating}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    elevation: 2,
    borderColor: colors.border,
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  hotelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.header,
    marginBottom: 4,
  },
  hotelCity: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  hotelDetails: {
    fontSize: 12,
    color: colors.text,
  },
});

export default HotelCard;
