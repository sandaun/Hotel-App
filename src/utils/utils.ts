export const validateImageUrl = async url => {
  try {
    const response = await fetch(url, {method: 'HEAD'});
    return response.ok;
  } catch {
    return false;
  }
};
