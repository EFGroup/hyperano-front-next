import React from 'react';
import PropTypes from 'prop-types';

import { Topbar, Footer } from './components';

const MinimalLayout = ({ children }) => {
  const { menus, isLanding } = children.props;

  return (
    <>
      <Topbar menus={menus} isLanding={isLanding}/>
      <main>
        { children }
      </main>
      <Footer menus={menus} />
    </>
  );
};

MinimalLayout.propTypes = {
  children: PropTypes.node,
};

export default MinimalLayout;
