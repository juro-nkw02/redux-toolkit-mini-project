import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Button = (props) => {
  const { label, variation = 'default', disabled } = props;
  const [type, setType] = useState('submit');
  const [className, setClassName] = useState('btn__submit');

  useEffect(() => {
    if (variation == 'reset') {
      setType('reset');
      setClassName(
        'ml-10 px-8 py-2 border border-[#e87070] rounded-md hover:bg-gradient-to-br hover:from-[#cf1b1b] hover:to-[#aa8383b3]'
      );
    }
  }, [variation]);

  return (
    <button type={type} className={className  + ` ${disabled && 'pointer-events-none'}`} disabled={disabled}>
      {label}
    </button>
  );
};

Button.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  variation: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
