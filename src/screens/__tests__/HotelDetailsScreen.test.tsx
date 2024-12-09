import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HotelDetailsScreen from '../HotelDetailsScreen';
import {useHeader} from '../../contexts/HotelContext';
import {Hotel} from '../../types/types';

jest.mock('../../contexts/HotelContext', () => ({
  useHeader: jest.fn(),
}));

const mockSetHeaderConfig = jest.fn();

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockHotel: Hotel = {
  id: 1,
  name: 'Hotel Paradise',
  stars: 5,
  price: 300,
  currency: 'EUR',
  gallery: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  userRating: 9.0,
  location: {
    address: '123 Paradise St',
    city: 'Dreamland',
    latitude: 0,
    longitude: 0,
  },
  contact: {
    email: 'info@paradise.com',
    phoneNumber: '123-456-7890',
  },
  checkIn: {from: '14:00', to: '22:00'},
  checkOut: {from: '08:00', to: '11:00'},
};

describe('HotelDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useHeader as jest.Mock).mockReturnValue({
      setHeaderConfig: mockSetHeaderConfig,
    });
  });

  it('calls setHeaderConfig with the correct title and back button', async () => {
    const rendered = render(
      <NavigationContainer>
        <HotelDetailsScreen
          navigation={mockNavigation as any}
          route={{params: {hotel: mockHotel}} as any}
        />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(mockSetHeaderConfig).toHaveBeenCalledWith({
        title: 'Hotel Paradise',
        showBackButton: true,
      });
    });

    rendered.unmount();
  });

  it('renders hotel details correctly', async () => {
    const {getByText} = render(
      <NavigationContainer>
        <HotelDetailsScreen
          navigation={mockNavigation as any}
          route={{params: {hotel: mockHotel}} as any}
        />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByText('🌟 5 stars')).toBeTruthy();
      expect(getByText('📍 123 Paradise St, Dreamland')).toBeTruthy();
      expect(getByText('📞 123-456-7890')).toBeTruthy();
      expect(getByText('✉️ info@paradise.com')).toBeTruthy();
      expect(getByText('💰 300 EUR per night')).toBeTruthy();
      expect(getByText(/🤩 Users score: 9(\.0)?\/10/)).toBeTruthy();
    });
  });

  it('renders gallery images correctly', async () => {
    const {getAllByTestId} = render(
      <NavigationContainer>
        <HotelDetailsScreen
          navigation={mockNavigation as any}
          route={{params: {hotel: mockHotel}} as any}
        />
      </NavigationContainer>,
    );

    await waitFor(() => {
      const images = getAllByTestId('validated-image');
      expect(images).toHaveLength(mockHotel.gallery.length);
    });
  });
});
