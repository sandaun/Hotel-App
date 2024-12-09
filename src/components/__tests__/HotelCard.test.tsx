import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import HotelCard from '../HotelCard';
import {Hotel} from '../../types/types';

describe('HotelCard', () => {
  const mockHotel: Hotel = {
    id: 1,
    name: 'Test Hotel',
    stars: 4,
    price: 200,
    currency: 'EUR',
    userRating: 8.5,
    location: {
      address: '123 Test Street',
      city: 'Test City',
      latitude: 0,
      longitude: 0,
    },
    contact: {
      email: 'test@example.com',
      phoneNumber: '+123456789',
    },
    gallery: ['https://example.com/image.jpg'],
    checkIn: {from: '12:00', to: '20:00'},
    checkOut: {from: '07:00', to: '10:00'},
  };

  it('renders hotel details correctly', async () => {
    const {getByText, getByTestId} = render(
      <HotelCard hotel={mockHotel} onPress={() => {}} />,
    );

    // Espera que es carreguin les actualitzacions de ValidatedImage
    await waitFor(() => {
      expect(getByTestId('validated-image')).toBeTruthy();
    });

    expect(getByText('Test Hotel')).toBeTruthy();
    expect(getByText('Test City')).toBeTruthy();
    expect(getByText(/4 stars/)).toBeTruthy();
    expect(getByText(/200 EUR/)).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const {getByText} = render(
      <HotelCard hotel={mockHotel} onPress={mockPress} />,
    );

    fireEvent.press(getByText('Test Hotel'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
