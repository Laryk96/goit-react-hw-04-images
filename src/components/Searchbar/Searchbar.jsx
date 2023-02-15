import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './Searchbar.styled';
import SearchForm from 'components/SearchForm';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit} />
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
