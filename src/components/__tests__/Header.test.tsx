import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Header from '../Header';
import {useNavigation} from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('Header', () => {
  const mockGoBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigation as jest.Mock).mockImplementation(() => ({
      goBack: mockGoBack,
      navigate: jest.fn(),
    }));
  });

  it('renders the title correctly', () => {
    const {getByText} = render(
      <Header title="Test Header" showBackButton={false} />,
    );

    expect(getByText('Test Header')).toBeTruthy();
  });

  it('renders the back button when showBackButton is true', () => {
    const {getByText} = render(
      <Header title="Test Header" showBackButton={true} />,
    );

    expect(getByText('←')).toBeTruthy();
  });

  it('does not render the back button when showBackButton is false', () => {
    const {queryByText} = render(
      <Header title="Test Header" showBackButton={false} />,
    );

    expect(queryByText('←')).toBeNull();
  });

  it('calls goBack when the back button is pressed', () => {
    const {getByText} = render(
      <Header title="Test Header" showBackButton={true} />,
    );

    const backButton = getByText('←');
    fireEvent.press(backButton);

    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
