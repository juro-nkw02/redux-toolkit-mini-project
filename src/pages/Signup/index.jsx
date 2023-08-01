import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, register } from '../../features/auth/authSlice.js';

const formInitial = {
  username: '',
  password: '',
  confirm_password: '',
};

const errorsInitial = {
  all: '',
  username: '',
  password: '',
  confirm_password: '',
  unmatch: '',
  existing: '',
};

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(formInitial);
  const [errors, setErrors] = useState(errorsInitial);
  const [showPass, setShowPass] = useState(false);
  const [showFirmPass, setShowFirmPass] = useState(false);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const validator = () => {
    let errorBag = [];

    const returnError = () => {
      setErrors(errorBag);
      return false;
    };

    if (auth.username.length === 0 && auth.password.length === 0) {
      errorBag['all'] = 'All fields are required!';
      return returnError();
    }

    if (auth.username.length === 0) {
      errorBag['username'] = 'Username must not be empty!';
    }
    if (auth.password.length === 0) {
      errorBag['password'] = 'Password must not be empty!';
    } else if (auth.password.length < 8) {
      errorBag['password'] = 'Password must be at least 8 characters!';
    } else if (auth.confirm_password.length === 0) {
      errorBag['confirm_password'] = 'Please confirm your password!';
    }
    if (
      auth.password !== auth.confirm_password &&
      auth.confirm_password.length !== 0
    ) {
      errorBag['password'] = 'Password must be same!';
      return returnError();
    }

    if (
      auth.username.length !== 0 &&
      auth.password.length !== 0 &&
      auth.confirm_password.length !== 0
    ) {
      const userExists = users.some((user) => {
        return user.username === auth.username;
      });

      if (!userExists) {
        return true;
      }

      errorBag['existing'] =
        'Your username already existed! Please create with new one.';
    }

    return returnError();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAuth({ ...auth, [name]: value });
  };

  const togglePass = () => {
    setShowPass(!showPass);
  };

  const toggleFirmPass = () => {
    setShowFirmPass(!showFirmPass);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    if (validator()) {
      dispatch(
        register({
          payload: {
            username: auth.username,
            password: auth.password,
          },
          navigate,
        })
      );
    }
  };

  return (
    <section className='w-3/5 m-auto text-white'>
      <p className='text-center mb-4 text-4xl'>Register to GS! </p>
      <form onSubmit={handleLoginSubmit}>
        {errors?.all && <p className='error'>{errors?.all}</p>}
        {errors?.existing && <p className='error'>{errors?.existing}</p>}
        <div>
          <label htmlFor='username'>Username</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.username ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Enter your username'
              value={auth.username}
              onChange={handleOnChange}
            />
          </div>
          {errors?.username && <p className='error'>{errors?.username}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.password ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              type={showPass ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Enter your password'
              value={auth.password}
              onChange={handleOnChange}
            />
            {showPass ? (
              <FiEyeOff
                className='absolute top-[35%] right-[3%] text-black cursor-pointer'
                onClick={togglePass}
              />
            ) : (
              <FiEye
                className='absolute top-[35%] right-[3%] text-black cursor-pointer'
                onClick={togglePass}
              />
            )}
          </div>
          {errors?.password && <p className='error'>{errors?.password}</p>}
        </div>
        <div>
          <label htmlFor='confirm_password'>Confirm Password</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.confirm_password
                ? 'bg__error'
                : 'bg__success'
            }`}
          >
            <input
              type={showFirmPass ? 'text' : 'password'}
              name='confirm_password'
              id='confirm_password'
              placeholder='Confirm your password'
              value={auth.confirm_password}
              onChange={handleOnChange}
            />
            {showFirmPass ? (
              <FiEyeOff
                className='absolute top-[35%] right-[3%] text-black cursor-pointer'
                onClick={toggleFirmPass}
              />
            ) : (
              <FiEye
                className='absolute top-[35%] right-[3%] text-black cursor-pointer'
                onClick={toggleFirmPass}
              />
            )}
          </div>
          {errors?.confirm_password && (
            <p className='error'>{errors?.confirm_password}</p>
          )}
        </div>

        <button type='submit' className='btn__submit'>
          Sign up
        </button>
      </form>
    </section>
  );
};

export default Index;
