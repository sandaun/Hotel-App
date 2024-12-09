import {validateImageUrl} from '../utils';

describe('validateImageUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns true for a valid image URL', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      } as Response),
    );

    const result = await validateImageUrl('https://example.com/image.jpg');
    expect(fetch).toHaveBeenCalledWith('https://example.com/image.jpg', {
      method: 'HEAD',
    });
    expect(result).toBe(true);
  });

  it('returns false for an invalid image URL', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    );

    const result = await validateImageUrl('https://example.com/invalid.jpg');
    expect(fetch).toHaveBeenCalledWith('https://example.com/invalid.jpg', {
      method: 'HEAD',
    });
    expect(result).toBe(false);
  });

  it('returns false when fetch throws an error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const result = await validateImageUrl('https://example.com/error.jpg');
    expect(fetch).toHaveBeenCalledWith('https://example.com/error.jpg', {
      method: 'HEAD',
    });
    expect(result).toBe(false);
  });
});
