import { useField } from 'formik';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import PropTypes from 'prop-types';

const InputPassword = (props) => {
  const { label, name, placeholder } = props;

  const [field, meta] = useField(name);
  const [showPass, setShowPass] = useState(false);

  const togglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div
        className={`p-0.5 w-full rounded-md relative ${
          meta?.error ? 'bg__error' : 'bg__success'
        }`}
      >
        <input
          type={showPass ? 'text' : 'password'}
          name={name}
          id={name}
          placeholder={placeholder ?? 'Enter ' + name}
          {...field}
        />
        {showPass ? (
          <FiEye
            className='absolute top-[35%] right-[3%] text-black cursor-pointer'
            onClick={togglePass}
          />
        ) : (
          <FiEyeOff
            className='absolute top-[35%] right-[3%] text-black cursor-pointer'
            onClick={togglePass}
          />
        )}
      </div>
      {meta?.error && <p className='error'>{meta?.error}</p>}
    </div>
  );
};

InputPassword.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
};

export default InputPassword;
