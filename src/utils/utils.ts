export const validateImageUrl = async (url: string) => {
  try {
    const response = await fetch(url, {method: 'HEAD'});
    return response.ok;
  } catch {
    return false;
  }
};

export const formatHotelName = (name: string) =>
  name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
