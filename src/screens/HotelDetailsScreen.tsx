import React, {useEffect} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';
import ValidatedImage from '../components/ValidatedImage';
import colors from '../styles/colors';
import {useHeader} from '../contexts/HotelContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';

type HotelDetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'HotelDetails'
>;

const HotelDetailsScreen: React.FC<HotelDetailsScreenProps> = ({route}) => {
  const {hotel} = route.params;
  const {setHeaderConfig} = useHeader();

  useEffect(() => {
    setHeaderConfig({
      title: hotel.name || 'Hotel Details',
      showBackButton: true,
    });
  }, [hotel, setHeaderConfig]);

  return (
    <ScrollView style={styles.container}>
      {hotel.gallery && hotel.gallery.length > 0 && (
        <ScrollView horizontal style={styles.gallery}>
          {hotel.gallery.map((imageUrl, index) => (
            <ValidatedImage
              key={index}
              uri={imageUrl}
              style={styles.galleryImage}
            />
          ))}
        </ScrollView>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>🌟 {hotel.stars} stars</Text>
        <Text style={styles.detailText}>
          📍 {hotel.location.address}, {hotel.location.city}
        </Text>
        <Text style={styles.detailText}>📞 {hotel.contact.phoneNumber}</Text>
        <Text style={styles.detailText}>✉️ {hotel.contact.email}</Text>
        <Text style={styles.detailText}>
          💰 {hotel.price} {hotel.currency} per night
        </Text>
        <Text style={styles.detailText}>
          ⭐ Users score: {hotel.userRating}/10
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  detailsContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
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
    color: colors.text,
  },
});

export default HotelDetailsScreen;
