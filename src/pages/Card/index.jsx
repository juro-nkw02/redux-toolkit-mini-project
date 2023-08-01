import PropTypes from 'prop-types';
import Modal from '../../components/Modal';
import { useNavigate } from 'react-router-dom';
import { AUTHORIZATION } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { TiDeleteOutline, TiEdit } from 'react-icons/ti';
import { deleteGame } from '../../features/game/gameSlice.js';
import { useState } from 'react';

const Index = ({ game }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedGame, setSelectedGame] = useState({});
  const authenticatedUser = useSelector(
    (state) => state.auth.authenticatedUser
  );

  const closeModal = () => setShowModal(false);

  const actions = [
    {
      label: 'Confirm',
      callbackFunction: () => {
        dispatch(deleteGame({ payload: selectedGame }));
        closeModal();
      },
    },
    {
      label: 'Cancel',
      callbackFunction: () => {
        closeModal();
      },
    },
  ];

  const editGame = (data) => {
    navigate(`/games/${data.id}`);
  };

  const deleteRecord = (data) => {
    setSelectedGame(data);
    setShowModal(true);
  };

  return (
    <section>
      {authenticatedUser?.username == AUTHORIZATION.username &&
        authenticatedUser?.password == AUTHORIZATION.password && (
          <div className='w-60 flex justify-end text-white text-3xl gap-x-2 mb-2'>
            <TiEdit
              className='cursor-pointer hover:fill-[#e87070] transition-all duration-200'
              onClick={() => editGame(game)}
            />
            <TiDeleteOutline
              className='cursor-pointer hover:fill-[#e87070] transition-all duration-200'
              onClick={() => deleteRecord(game)}
            />
          </div>
        )}
      <div className='w-60 flex flex-col justify-center items-center bg-gradient-to-r from-[#100f0fb3] to-[#e87070] rounded-lg transition-all ease-in-out duration-700 group/card hover:bg-[#ff0000] hover:rounded-tr-[50%] hover:rounded-tl-[50%]'>
        <img
          src={game.img_url}
          alt={game.name}
          className='transition-all ease-in-out duration-700 max-w-full group-hover/card:translate-y-[-6%] group-hover/card:scale-110'
        />
        <div className='w-full bg-[#100f0f60] p-3 rounded-bl-lg rounded-br-lg z-1 text-center text-white text-2xl transition-all duration-700 ease-in-out group-hover/card:bg-gradient-to-r group-hover/card:from-[#100f0fb3] group-hover/card:to-[#e87070]'>
          <p>{game.name}</p>
        </div>
      </div>

      {showModal && (
        <Modal
          message={'Are you sure you want to delete this game?'}
          actions={actions}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

Index.propTypes = {
  game: PropTypes.object,
};

export default Index;
