import axios from 'axios';
import { toast } from 'react-toastify';
import { GAME_URL } from '../../config';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createGame, updateGame } from '../../features/game/gameSlice';

const initialGame = {
  id: '',
  name: '',
  img_url: '',
};

const initialGameFormErrors = {
  all: '',
  name: '',
  img_url: '',
};

const compareArray = (arrOne, arrTwo) => {
  return JSON.stringify(arrOne) === JSON.stringify(arrTwo);
};

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [game, setGame] = useState(initialGame);
  const [currentGame, setCurrentGame] = useState(initialGame);
  const [errors, setErrors] = useState(initialGameFormErrors);

  useEffect(() => {
    if (id) {
      axios
        .get(`${GAME_URL}/games/${id}`)
        .then((resp) => {
          console.log(resp);
          if (resp.status === 200 || resp.status === 'OK') {
            setGame(resp.data);
            setCurrentGame(resp.data);
          }
        })
        .catch((ex) => {
          console.log('Error getting the game with id: ' + id, ex);
        });
    } else {
      setGame(initialGame);
      setCurrentGame(initialGame);
    }
  }, [id]);

  const validator = () => {
    let errorBag = [];

    const returnError = () => {
      setErrors(errorBag);
      return false;
    };

    if (currentGame.name === '' && currentGame.img_url === '') {
      errorBag['all'] = 'All fields are required.';

      return returnError();
    }

    if (currentGame.name === '') {
      errorBag['name'] = 'The game name is required.';
    }
    if (currentGame.img_url === '') {
      errorBag['img_url'] = 'The image url is required.';
    }

    if (currentGame.name !== '' && currentGame.img_url !== '') {
      if (!compareArray(game, currentGame)) {
        return true;
      } else {
        toast.info('Your value are same.');
      }
    }

    return returnError();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setCurrentGame({ ...currentGame, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validator()) {
      if (id) {
        dispatch(updateGame({ payload: currentGame, navigate }));
      } else {
        dispatch(createGame({ payload: currentGame, navigate }));
      }
    }
  };

  const handleReset = () => {
    navigate('/');
  };

  return (
    <section className='w-3/5 m-auto text-white'>
      <p className='text-center mb-4 text-4xl'>
        {id ? 'Update Game' : 'Create Game'}
      </p>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {errors?.all && <p className='error'>{errors?.all}</p>}
        {errors?.register && <p className='error'>{errors?.register}</p>}
        <div>
          <label htmlFor='name'>Name</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.name ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter your name'
              value={currentGame.name}
              onChange={handleOnChange}
            />
          </div>
          {errors?.name && <p className='error'>{errors?.name}</p>}
        </div>
        <div>
          <label htmlFor='img_url'>Image URL</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.img_url ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              type='text'
              name='img_url'
              id='img_url'
              placeholder='Enter your image url'
              value={currentGame.img_url}
              onChange={handleOnChange}
            />
          </div>
          {errors?.img_url && <p className='error'>{errors?.img_url}</p>}
        </div>

        <button type='submit' className='btn__submit'>
          Save
        </button>
        <button
          type='reset'
          className='ml-10 px-8 py-2 border border-[#e87070] rounded-md hover:bg-gradient-to-br hover:from-[#cf1b1b] hover:to-[#aa8383b3]'
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default Index;
