import PropTypes from 'prop-types';

const Button = (props) => {
  const { label, variation = 'default' } = props;

  switch (variation) {
    case 'default':
      return (
        <button type='submit' className='btn__submit'>
          {label}
        </button>
      );
    case 'reset':
      return (
        <button
          type='reset'
          className='ml-10 px-8 py-2 border border-[#e87070] rounded-md hover:bg-gradient-to-br hover:from-[#cf1b1b] hover:to-[#aa8383b3]'
        >
          {label}
        </button>
      );
    default:
      return (
        <button type='button' className='btn__submit'>
          {label}
        </button>
      );
  }
};

Button.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  variation: PropTypes.string,
};

export default Button;
