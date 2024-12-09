import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../App';

it('shows the loading indicator initially', () => {
  const {getByTestId} = render(<App />);
  expect(getByTestId('loading-indicator')).toBeTruthy();
});

it('renders the App with HeaderProvider and NavigationContainer', async () => {
  const {getByTestId} = render(<App />);

  await waitFor(() => {
    expect(getByTestId('hotel-list-screen')).toBeTruthy();
  });
});
