import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const HotelDetailsScreen = ({route}) => {
  const {hotel} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.hotelName}>{hotel.name}</Text>

      {hotel.gallery && hotel.gallery.length > 0 && (
        <ScrollView horizontal style={styles.gallery}>
          {hotel.gallery.map((imageUrl, index) => (
            <Image
              key={index}
              source={{uri: imageUrl}}
              style={styles.galleryImage}
            />
          ))}
        </ScrollView>
      )}

      <Text style={styles.detailText}>🌟 {hotel.stars} stars</Text>
      <Text style={styles.detailText}>
        📍 {hotel.location.address}, {hotel.location.city}
      </Text>
      <Text style={styles.detailText}>
        📞 {hotel.contact.phoneNumber} | ✉️ {hotel.contact.email}
      </Text>
      <Text style={styles.detailText}>
        💰 {hotel.price} {hotel.currency} per night
      </Text>
      <Text style={styles.detailText}>
        ⭐ Users score: {hotel.userRating}/10
      </Text>

      <Text style={styles.detailText}>
        🕒 Check-in: from {hotel.checkIn.from} to {hotel.checkIn.to}
      </Text>
      <Text style={styles.detailText}>
        🕒 Check-out: from {hotel.checkOut.from} to {hotel.checkOut.to}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gallery: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default HotelDetailsScreen;
