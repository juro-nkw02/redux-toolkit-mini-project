import PropTypes from 'prop-types';
import { RxCross1 } from 'react-icons/rx';

const Modal = ({ title = '', message = '', actions = [], closeModal }) => {
  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 bg-[#11111190] flex justify-center items-center z-10'>
      <div className='border rounded-lg min-w-fit border-[#e87070] bg-gradient-to-r from-[#100f0f] to-[#e87070] text-white text-left'>
        <div className='w-full flex justify-end items-center pt-4 pe-4'>
          <RxCross1
            className='text-white cursor-pointer'
            onClick={() => {
              closeModal();
            }}
          />
        </div>
        {title !== '' && (
          <div className='p-8 pb-6 pt-2 border-b border-[#e87070]'>{title}</div>
        )}
        {message !== '' && (
          <div className='p-8 pt-4 border-b border-[#e87070]'>{message}</div>
        )}
        {actions !== [] && (
          <div className='p-4 flex justify-center items-center gap-x-5'>
            {actions.map((act, ind) => (
              <button
                key={ind}
                className='px-4 hover:text-[#ff0000] transition-all duration-200'
                onClick={act.callbackFunction}
              >
                {act.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.array,
  closeModal: PropTypes.func,
};

export default Modal;
