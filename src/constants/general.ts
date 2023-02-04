export const checkIsDebug = async () => {
  const response = await fetch(
    'https://www.instarepost.net/debug/index.php?trendInsta=true&insta=true',
  );
  const result = await response.json();
  return result;
};
