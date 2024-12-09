import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button, Text} from 'react-native';
import {HeaderProvider, useHeader} from '../HotelContext';

// Mock Component to consume context
const MockConsumer: React.FC = () => {
  const {headerConfig, setHeaderConfig} = useHeader();

  return (
    <>
      <Text testID="header-title">{headerConfig.title}</Text>
      <Text testID="show-back-button">
        {headerConfig.showBackButton.toString()}
      </Text>
      <Button
        title="Update Header"
        onPress={() =>
          setHeaderConfig({
            title: 'Updated Title',
            showBackButton: true,
          })
        }
      />
    </>
  );
};

describe('HotelContext', () => {
  it('provides default headerConfig values', () => {
    const {getByTestId} = render(
      <HeaderProvider>
        <MockConsumer />
      </HeaderProvider>,
    );

    expect(getByTestId('header-title').props.children).toBe('');
    expect(getByTestId('show-back-button').props.children).toBe('false');
  });

  it('updates headerConfig correctly', () => {
    const {getByTestId, getByText} = render(
      <HeaderProvider>
        <MockConsumer />
      </HeaderProvider>,
    );

    fireEvent.press(getByText('Update Header'));

    expect(getByTestId('header-title').props.children).toBe('Updated Title');
    expect(getByTestId('show-back-button').props.children).toBe('true');
  });

  it('throws error when useHeader is used outside HeaderProvider', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const renderWithoutProvider = () => render(<MockConsumer />);

    expect(renderWithoutProvider).toThrowError(
      'useHeader must be used within a HeaderProvider',
    );

    consoleErrorSpy.mockRestore();
  });
});
