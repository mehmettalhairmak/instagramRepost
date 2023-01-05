export const getMedia = shortCode => {
  const link =
    'https://instagram-scraper-2022.p.rapidapi.com/ig/post_info/?shortcode=' +
    shortCode;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1435b300d1msh32b5f891e102482p12f1f1jsn58c2fb6da7e2',
      'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com',
    },
  };

  return fetch(link, options)
    .then(response => response.json())
    .catch(err => console.error(err));
};
