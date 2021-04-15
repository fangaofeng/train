const STORAGE_TOKEN_NAME = 'BNDQYHGPXPT_TOKEN';

export default {
  get() {
    // console.log('token');
    return localStorage.getItem(STORAGE_TOKEN_NAME);
  },
  save(token) {
    localStorage.setItem(STORAGE_TOKEN_NAME, token);
  },
  remove() {
    localStorage.removeItem(STORAGE_TOKEN_NAME);
  },
};
