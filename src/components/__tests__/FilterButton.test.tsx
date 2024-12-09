import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FilterButton from '../FilterButton';
import colors from '../../styles/colors';

describe('FilterButton', () => {
  it('renders correctly with a label', () => {
    const {getByText} = render(
      <FilterButton label="🌟 Stars" isSelected={false} onPress={() => {}} />,
    );

    expect(getByText('🌟 Stars')).toBeTruthy();
  });

  it('applies active styles when selected', () => {
    const {getByText} = render(
      <FilterButton label="🌟 Stars" isSelected={true} onPress={() => {}} />,
    );

    const button = getByText('🌟 Stars');
    expect(button).toHaveStyle({
      color: colors.background,
      fontWeight: 'bold',
    });
  });

  it('calls onPress when clicked', () => {
    const mockPress = jest.fn();
    const {getByText} = render(
      <FilterButton label="🌟 Stars" isSelected={false} onPress={mockPress} />,
    );

    fireEvent.press(getByText('🌟 Stars'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
