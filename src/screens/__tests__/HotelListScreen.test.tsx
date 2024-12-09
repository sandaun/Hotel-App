import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HotelListScreen from '../HotelListScreen';
import {useHeader} from '../../contexts/HotelContext';
import {fetchHotels} from '../../services/api';
import {Hotel} from '../../types/types';

jest.mock('../../services/api');
jest.mock('../../contexts/HotelContext', () => ({
  useHeader: jest.fn(),
}));

const mockSetHeaderConfig = jest.fn();

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('HotelListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useHeader as jest.Mock).mockReturnValue({
      setHeaderConfig: mockSetHeaderConfig,
    });
  });

  it('renders the loading indicator initially', async () => {
    await waitFor(() => {
      const {getByText, getByTestId} = render(
        <NavigationContainer>
          <HotelListScreen
            navigation={mockNavigation as any}
            route={{} as any}
          />
        </NavigationContainer>,
      );

      expect(getByTestId('loading-indicator')).toBeTruthy();
      expect(getByText('Loading hotels...')).toBeTruthy();
    });
  });

  it('renders hotel list after loading', async () => {
    const mockHotels: Hotel[] = [
      {
        id: 1,
        name: 'Hotel Test',
        stars: 4,
        price: 200,
        currency: 'EUR',
        gallery: ['https://example.com/image.jpg'],
        userRating: 8.5,
        location: {
          address: '123 Test St',
          city: 'Test City',
          latitude: 0,
          longitude: 0,
        },
        contact: {
          email: 'test@example.com',
          phoneNumber: '123456789',
        },
        checkIn: {from: '14:00', to: '22:00'},
        checkOut: {from: '08:00', to: '11:00'},
      },
    ];

    (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);

    const {getByText, queryByTestId} = render(
      <NavigationContainer>
        <HotelListScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(queryByTestId('loading-indicator')).toBeNull();
    });

    expect(getByText('Hotel Test')).toBeTruthy();
    expect(getByText(/🌟\s*4\s*stars/i)).toBeTruthy();
    expect(getByText(/200 EUR/)).toBeTruthy();
  });

  it('calls setHeaderConfig when screen is focused', async () => {
    const rendered = render(
      <NavigationContainer>
        <HotelListScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(mockSetHeaderConfig).toHaveBeenCalledWith({
        title: 'Hotels App',
        onFilterPress: expect.any(Function),
        selectedFilter: '',
        showBackButton: false,
      });
    });

    rendered.unmount();
  });

  it('navigates to HotelDetails when a card is pressed', async () => {
    const mockHotels: Hotel[] = [
      {
        id: 1,
        name: 'Hotel Test',
        stars: 4,
        price: 200,
        currency: 'EUR',
        gallery: ['https://example.com/image.jpg'],
        userRating: 8.5,
        location: {
          address: '123 Test St',
          city: 'Test City',
          latitude: 0,
          longitude: 0,
        },
        contact: {
          email: 'test@example.com',
          phoneNumber: '123456789',
        },
        checkIn: {from: '14:00', to: '22:00'},
        checkOut: {from: '08:00', to: '11:00'},
      },
    ];

    (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);

    const {getByText} = render(
      <NavigationContainer>
        <HotelListScreen navigation={mockNavigation as any} route={{} as any} />
      </NavigationContainer>,
    );

    await waitFor(() => {
      expect(getByText('Hotel Test')).toBeTruthy();
    });

    fireEvent.press(getByText('Hotel Test'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('HotelDetails', {
      hotel: mockHotels[0],
    });
  });
});
