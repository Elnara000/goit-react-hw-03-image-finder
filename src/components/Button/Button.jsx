import PropTypes from 'prop-types';
import css from './Buton.module.css';
export default function Button({ onClick }) {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
};
