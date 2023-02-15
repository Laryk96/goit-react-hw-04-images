import { Сaption } from './Title.styled';
import PropTypes from 'prop-types';

const Title = ({ children }) => {
  return <Сaption>{children}</Сaption>;
};

Title.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Title;
