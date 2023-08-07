import axios from 'axios';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { GAME_URL } from '../../config';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormikController from '../../formik/formik-container';
import { createGame, updateGame } from '../../features/game/gameSlice';

const initialGame = {
  id: '',
  name: '',
  img_url: '',
};

const initialGameFormErrors = {
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

  useEffect(() => {
    if (id) {
      axios
        .get(`${GAME_URL}/games/${id}`)
        .then((resp) => {
          if (resp.status === 200 || resp.status === 'OK') {
            setGame(resp.data);
          }
        })
        .catch((ex) => {
          console.log('Error getting the game with id: ' + id, ex);
        });
    } else {
      setGame(initialGame);
    }
  }, [id]);

  const validator = (values) => {
    if (game.id) {
      values.id = game.id;
    }

    if (!compareArray(game, values)) {
      return true;
    } else {
      toast.info('Your value are same.');
      return false;
    }
  };

  const handleSubmit = (values) => {
    if (!validator(values)) {
      return;
    }
    if (game.id) {
      dispatch(updateGame({ payload: values, navigate }));
    } else {
      dispatch(createGame({ payload: values, navigate }));
    }
  };

  // can't be used with onReset event on Formik
  // const handleReset = () => {
  //   navigate('/');
  // };

  return (
    <section className='w-3/5 m-auto text-white'>
      <p className='text-center mb-4 text-4xl'>
        {id ? 'Update Game' : 'Create Game'}
      </p>
      <Formik
        initialValues={game}
        initialErrors={initialGameFormErrors}
        enableReinitialize
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          name: Yup.string().required('Game Name is required.'),
          img_url: Yup.string().required('Image URL is required.'),
        })}
        // onReset={handleReset}    // this will be called every time the component is re-rendered
      >
        {(formProps) => (
          <Form>
            <FormikController
              control='input'
              label='Name'
              name='name'
              placeholder='Enter a game name...'
            />
            <FormikController
              control='input'
              label='Image URL'
              name='img_url'
              placeholder='Enter the game image url...'
            />

            <FormikController
              control='button'
              label='Save'
              disabled={
                formProps.isSubmitting ||
                !(formProps.dirty && formProps.isValid)
              }
            />
            <FormikController
              control='button'
              label='Cancel'
              variation='other'
              customAction={true}
              clickAction={() => navigate('/')}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Index;
