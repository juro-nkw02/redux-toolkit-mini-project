import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa/index';

const MenuDropdown = (props) => {
  const ddItems = [
    {
      key: 'item-1',
      label: 'Item 1',
      action: () => {
        alert('hi');
      },
    },
    {
      key: 'item-2',
      label: 'Item 2',
      action: () => {
        alert('hi 2');
      },
    },
  ];
  const { title, items = ddItems } = props;

  const [showItems, setShowItems] = useState(false);

  const toggleDropdown = () => {
    setShowItems(!showItems);
  };

  return (
    <div className='relative inline-flex'>
      <button
        type='button'
        className='relative font-medium left-auto -mt-3 right-0 text-left'
        onClick={toggleDropdown}
      >
        <p className='inline-flex justify-center items-center gap-x-1.5'>
          {title}
          {showItems ? (
            <FaChevronUp size='12' className='text-gray-100' />
          ) : (
            <FaChevronDown size='12' className='text-gray-100' />
          )}
        </p>
      </button>
      {showItems && (
        <div className='bg-[#283046] absolute transform translate-x-12 translate-y-10 z-[1000] min-w-[8rem] py-2 text-base text-left list-none bg-clip-padding drop-shadow-lg border-2 border-[rgba(34,41,47,0.5)] rounded-md -top-6 right-10 left-auto'>
          {Object.keys(items).length > 0 &&
            items.map((item) => (
              <a
                className='w-auto cursor-pointer block py-3 px-5 clear-both  border-0 whitespace-nowrap items-center hover:focus:bg-opacity-100 hover:focus:text-[#7367f0] hover:focus:bg-[#7367f01f] active:text-white active:bg-[#7367f0]'
                href='#'
                key={item.key}
                onClick={item.action}
              >
                {item.label}
              </a>
            ))}
        </div>
      )}
    </div>
  );
};

MenuDropdown.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  items: PropTypes.array,
};

export default MenuDropdown;
