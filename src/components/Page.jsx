import React from 'react';
import PropTypes from 'prop-types';

/* Material UI Components */
import Container from '@material-ui/core/Container';

/* Cpmponents */
import Header from '@containers/HeaderContainer';

const Page = ({ children }) => (
  <>
    <Header />
    <Container>
      {children}
    </Container>
  </>
);

Page.propTypes = {
  children: PropTypes.node.isRequired
};

export default Page;
