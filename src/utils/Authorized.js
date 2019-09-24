import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from './authority';

console.log(`当前用户身份：`,getAuthority());
let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};
export { reloadAuthorized };
export default Authorized;
