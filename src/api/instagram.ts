export const getMedia = async (shortCode: string) => {
  const link =
    'https://instagram-best-experience.p.rapidapi.com/post?shortcode=' +
    shortCode;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1435b300d1msh32b5f891e102482p12f1f1jsn58c2fb6da7e2',
      'X-RapidAPI-Host': 'instagram-best-experience.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(link, options);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};
