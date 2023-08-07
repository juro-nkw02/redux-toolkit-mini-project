import { useField } from 'formik';
import PropTypes from 'prop-types';

const Input = (props) => {
  const { label, name, placeholder } = props;
  const [field, meta] = useField(name);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div
        className={`p-0.5 w-full rounded-md relative  ${
          meta.touched && meta?.error ? 'bg__error' : 'bg__success'
        }`}
      >
        <input
          type='text'
          name={name}
          id={name}
          placeholder={placeholder ?? 'Enter ' + label}
          {...field}
        />
      </div>
      {meta?.error && meta.touched && <p className='error'>{meta?.error}</p>}
    </div>
  );
};

Input.propTypes = {
  props: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
