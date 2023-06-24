import React from 'react';
import PropTypes from 'prop-types';

import { Topbar, Footer } from './components';

const MinimalLayout = ({ children }) => {
  const { menus, shops, isLanding } = children.props;

  return (
    <>
      <Topbar menus={menus} shops={shops} isLanding={isLanding} />
      <main>{children}</main>
      <Footer menus={menus} />
    </>
  );
};

MinimalLayout.propTypes = {
  children: PropTypes.node,
};

export default MinimalLayout;
