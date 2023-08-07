import useToken from '../../hooks/useToken.js';
import { AUTHORIZATION } from '../../constants';
import { NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice.js';
import MenuDropdown from '../../components/MenuDropdown.jsx';

const Index = () => {
  let { token } = useToken();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticatedUser);

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload(false);
  };

  const dropdownItems = [
    {
      key: 'logout',
      label: 'Logout',
      action: handleLogout,
    },
  ];

  return (
    <>
      <div className='flex justify-between w-full text-white'>
        <div className='flex gap-x-2 justify-start items-center z-10 p-4'>
          <p className='text-5xl mr-10'>GZ</p>
          <nav>
            <ul className='flex list-none gap-x-8'>
              <li className='hover:text-red-400'>
                <NavLink to='/' activeclassname='active'>
                  Home
                </NavLink>
              </li>
              {authenticated?.username == AUTHORIZATION.username &&
                authenticated?.password == AUTHORIZATION.password && (
                  <li className='hover:text-red-400'>
                    <NavLink to='/games/create' activeclassname='active'>
                      Add
                    </NavLink>
                  </li>
                )}
            </ul>
          </nav>
        </div>

        <div className='flex items-center p-4 pe-8 text-base'>
          {authenticated || token ? (
            <MenuDropdown
              title={authenticated?.username}
              items={dropdownItems}
            />
          ) : (
            <div className='flex gap-x-8 text-left'>
              <NavLink to='/login'>Log in</NavLink>
              <NavLink to='/register'>Register</NavLink>
            </div>
          )}
        </div>
      </div>

      <div className='w-[900px] m-auto p-8 absolute right-0 rounded-xl'>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Index;
