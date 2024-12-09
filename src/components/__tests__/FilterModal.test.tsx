import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FilterModal from '../FilterModal';
import colors from '../../styles/colors';

describe('FilterModal', () => {
  const mockOnApply = jest.fn();
  const mockOnClose = jest.fn();

  it('renders correctly with all filter options', () => {
    const {getByText} = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />,
    );

    expect(getByText('Choose a filter')).toBeTruthy();
    expect(getByText('🌟 Stars')).toBeTruthy();
    expect(getByText('💰 Price')).toBeTruthy();
    expect(getByText('🚫 No filter')).toBeTruthy();
  });

  it('highlights the selected filter', () => {
    const {getByText} = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />,
    );

    const starsOption = getByText('🌟 Stars');
    fireEvent.press(starsOption);

    expect(starsOption).toHaveStyle({
      color: colors.background,
    });
  });

  it('calls onApply with the selected filter', () => {
    const {getByText} = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />,
    );

    fireEvent.press(getByText('🌟 Stars'));
    fireEvent.press(getByText('Apply'));

    expect(mockOnApply).toHaveBeenCalledTimes(1);
    expect(mockOnApply).toHaveBeenCalledWith('stars');
  });

  it('calls onClose when Cancel is pressed', () => {
    const {getByText} = render(
      <FilterModal
        visible={true}
        onClose={mockOnClose}
        onApply={mockOnApply}
      />,
    );

    fireEvent.press(getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
