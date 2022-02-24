import axios from 'axios';
export const loadCharacters = async () => {
  const resp = await axios.get('https://rickandmortyapi.com/api/character');
  return resp.data;
};

export default {
  loadCharacters
};
