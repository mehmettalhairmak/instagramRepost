export const getPlaces = async (longitude: string, latitude: string) => {
  const link =
    'https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=10000&lon=' +
    longitude +
    '&lat=' +
    latitude +
    '&limit=30';

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1435b300d1msh32b5f891e102482p12f1f1jsn58c2fb6da7e2',
      'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
    },
  };

  const response = await fetch(link, options);
  const result = await response.json();
  return result;
};
