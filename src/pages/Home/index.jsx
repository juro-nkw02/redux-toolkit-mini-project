import Card from '../Card';
import { RxCross1 } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames } from '../../features/game/gameSlice';

const searchInitial = {
  keyword: '',
  result: {},
};

const Index = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState(searchInitial);
  const games = useSelector((state) => state.game.games);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  const clearSearch = () => {
    setSearch(searchInitial);
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    const result =
      keyword === ''
        ? games
        : games?.filter((game) =>
            game.name.toLowerCase().includes(keyword.toLowerCase())
          );

    setSearch({
      keyword: keyword,
      result: result,
    });
  };

  return (
    <section>
      <div className='flex flex-col gap-y-1 mb-2 w-1/4'>
        <div className='p-0.5 w-full rounded-md relative'>
          <input
            type='text'
            value={search.keyword}
            onChange={handleSearch}
            placeholder='Search...'
            className='w-full bg-white p-1 ps-2 rounded-md text-red-950 border-none'
          />
          {search.keyword !== '' && (
            <RxCross1
              className='absolute top-[30%] right-[5%] text-red-900 cursor-pointer'
              onClick={clearSearch}
            />
          )}
        </div>
      </div>
      <div className='w-full grid grid-cols-3 gap-y-16'>
        {games?.length > 0 ? (
          search.keyword === '' ? (
            games?.map((game) => <Card game={game} key={game.id} />)
          ) : (
            search.result?.map((game) => <Card game={game} key={game.id} />)
          )
        ) : (
          <p> Games are not available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default Index;
