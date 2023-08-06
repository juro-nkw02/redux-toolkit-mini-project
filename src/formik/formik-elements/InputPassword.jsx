import { useField } from 'formik';
import  { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi';

function InputPassword(props) {
    const [showPassword, setShowPassword] = useState(false);

    const { label, name, placeholder } = props;
    const [field, meta] = useField(name);
  
    console.log("Meta", meta);

    // functions
    const handleShowPassowrd = () => {
        setShowPassword(!showPassword)
    }
  return (
    <div>
          <label htmlFor={name}>{label}</label>
    <div
      className={`p-0.5 w-full rounded-md relative ${
        meta?.error ? 'bg__error' : 'bg__success'
       }`}
    >
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={name}
        placeholder={placeholder}
        {...field}
      />
              {showPassword ? (
                    <FiEye
                    className="absolute top-[35%] right-[3%] text-black cursor-pointer"
                    onClick={handleShowPassowrd}
                  />
    
      ) : (
        <FiEyeOff
        className="absolute top-[35%] right-[3%] text-black cursor-pointer"
        onClick={handleShowPassowrd}
      />
      )}
          </div>
          {meta?.error&& <p className='text-red-500'>{meta?.error}</p>}

          </div>
  )
}

export default InputPassword