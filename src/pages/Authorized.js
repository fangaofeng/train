import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
// alert(Authority);
const Authorized = RenderAuthorized(Authority);
// alert(Authorized);

export default ({ children }) => (
  <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/auth/login" />}>
    {children}
  </Authorized>
);
