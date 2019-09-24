const STORAGE_TOKEN_NAME = 'WHLQYHGPXPT_TOKEN';

export default {
  get() {
    return localStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(token) {
    localStorage.setItem(STORAGE_TOKEN_NAME, token);
  },
  remove() {
    localStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
