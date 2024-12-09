import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import ValidatedImage from '../components/ValidatedImage';
import MapView, {Marker} from 'react-native-maps';
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

  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  useEffect(() => {
    setHeaderConfig({
      title: hotel.name || 'Hotel Details',
      showBackButton: true,
    });
  }, [hotel, setHeaderConfig]);

  useEffect(() => {
    if (loadedImagesCount === hotel.gallery?.length) {
      setImagesLoading(false);
    }
  }, [loadedImagesCount, hotel.gallery?.length]);

  const handleImageLoad = () => {
    setLoadedImagesCount(prevCount => prevCount + 1);
  };

  return (
    <ScrollView style={styles.container} testID="hotel-details-screen">
      {imagesLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loaderText}>Loading gallery...</Text>
        </View>
      )}

      <ScrollView
        horizontal
        style={[styles.gallery, imagesLoading && styles.galleryHidden]}>
        {hotel.gallery?.map((imageUrl, index) => (
          <ValidatedImage
            key={index}
            uri={imageUrl}
            style={styles.galleryImage}
            onLoadEnd={handleImageLoad}
          />
        ))}
      </ScrollView>

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
          🤩 Users score: {hotel.userRating}/10
        </Text>
      </View>

      {hotel.location.latitude && hotel.location.longitude && (
        <MapView
          testID="hotel-details-map"
          style={styles.map}
          initialRegion={{
            latitude: hotel.location.latitude,
            longitude: hotel.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>
          <Marker
            coordinate={{
              latitude: hotel.location.latitude,
              longitude: hotel.location.longitude,
            }}
            title={hotel.name}
            description={`${hotel.location.address}, ${hotel.location.city}`}
          />
        </MapView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loaderText: {
    marginTop: 8,
    fontSize: 16,
    color: colors.text,
  },
  gallery: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  galleryHidden: {
    opacity: 0,
  },
  galleryImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
    marginRight: 8,
  },
  detailsContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: colors.border,
    backgroundColor: colors.cardBackground,
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
    color: colors.text,
  },
  map: {
    height: 300,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default HotelDetailsScreen;
