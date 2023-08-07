import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Button = (props) => {
  const {
    label,
    variation = 'default',
    disabled,
    customAction,
    clickAction,
  } = props;

  const [type, setType] = useState('submit');
  const [className, setClassName] = useState('btn__submit');
  const otherType =
    'ml-10 px-8 py-2 border border-[#e87070] rounded-md hover:bg-gradient-to-br hover:from-[#cf1b1b] hover:to-[#aa8383b3]';

  useEffect(() => {
    if (variation == 'reset') {
      setType('reset');
      setClassName(otherType);
    }
    if (variation == 'other') {
      setType('button');
      setClassName(otherType);
    }
  }, [variation]);

  return (
    <button
      type={type}
      className={
        className +
        ` ${disabled && 'opacity-50 cursor-not-allowed pointer-events-none'}`
      }
      disabled={disabled}
      {...(customAction && !disabled ? { onClick: clickAction } : {})}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  variation: PropTypes.string,
  disabled: PropTypes.bool,
  customAction: PropTypes.bool,
  clickAction: PropTypes.func,
};

export default Button;
