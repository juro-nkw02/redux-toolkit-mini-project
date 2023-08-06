import { useField } from "formik";

const Input = (props) => {
  const { label, name, placeholder, type } = props;
  const [field, meta] = useField(name);

  console.log("Meta", meta);
  return (
    <div>
      <label htmlFor="username">{label}</label>
      <div className={`p-0.5 w-full rounded-md relative ${
             meta?.error ? 'bg__error' : 'bg__success'
            }`}>
        <input
          type="text"
          name={name}
          id="username"
          placeholder={placeholder}
          {...field}
          //   value={auth.username}
          //   onChange={handleOnChange}
        />
          </div>
          {meta?.error&& <p className='text-red-500'>{meta?.error}</p>}

    </div>
  );
};

export default Input;
