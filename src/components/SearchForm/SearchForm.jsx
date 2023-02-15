import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import {
  Formik,
  StyleForm as Form,
  Input,
  Button,
  Label,
} from './SearchForm.styled';

const SearchForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={({ query }, actions) => {
        onSubmit(query);
        actions.resetForm();
      }}
    >
      <Form>
        <Button type="submit">
          <Label>Search</Label>
          <FaSearch />
        </Button>
        <Input name="query" placeholder="Search image and photos"></Input>
      </Form>
    </Formik>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
