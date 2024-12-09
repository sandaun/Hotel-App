import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import ValidatedImage from '../ValidatedImage';
import {validateImageUrl} from '../../utils/utils';

jest.mock('../../utils/utils', () => ({
  validateImageUrl: jest.fn(),
}));

describe('ValidatedImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the valid image URL', async () => {
    (validateImageUrl as jest.Mock).mockResolvedValue(true);

    const {getByTestId} = render(
      <ValidatedImage
        uri="https://example.com/valid-image.jpg"
        style={{width: 150, height: 150}}
      />,
    );

    await waitFor(() => {
      const image = getByTestId('validated-image');
      expect(image.props.source.uri).toBe(
        'https://example.com/valid-image.jpg',
      );
    });
  });

  it('renders the placeholder image for invalid URLs', async () => {
    (validateImageUrl as jest.Mock).mockResolvedValue(false);

    const {getByTestId} = render(
      <ValidatedImage
        uri="https://example.com/invalid-image.jpg"
        style={{width: 150, height: 150}}
      />,
    );

    await waitFor(() => {
      const image = getByTestId('validated-image');
      expect(image.props.source.uri).toBe(
        'https://via.placeholder.com/200?text=No+Image',
      );
    });
  });

  it('applies the passed styles', async () => {
    (validateImageUrl as jest.Mock).mockResolvedValue(true);

    const {getByTestId} = render(
      <ValidatedImage
        uri="https://example.com/valid-image.jpg"
        style={{width: 150, height: 150}}
      />,
    );

    await waitFor(() => {
      const image = getByTestId('validated-image');
      expect(image.props.style).toEqual({width: 150, height: 150});
    });
  });
});
