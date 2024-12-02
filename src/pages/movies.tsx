import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../style/movies.scss'
import { Table } from 'antd';

//Store
import { RootState } from '../store';
import { getMovieList } from '../store/movieReducer';

//Components
import SearchInput from '../components/searchInput';
import DateSelect from '../components/dateSelect';
import RadioButtons from '../components/radioButtons';
import TablePagination from '../components/pagination';

//Helpers
import { tableColumns } from '../utils/tableColumns'

const Movies: React.FC = () => {
  const initialMovies = useSelector((state: RootState) => state.movieSlice.movies);
  const loading = useSelector((state: RootState) => state.movieSlice.loading);
  const mediaType = useSelector((state: RootState) => state.movieSlice.currentMediaType);

  const [movies, setMovies] = useState(initialMovies);
  const dispatch = useDispatch < any > ();

  useEffect(() => {
    dispatch(getMovieList());
  }, [dispatch]);

  useEffect(() => {
    setMovies(initialMovies)
  }, [initialMovies]);

  return (
    <div className="container">
      <div className="movies">
        <div className="movies-top">
          <i className="fi fi-sr-clapperboard-play"></i>
          <h1>{mediaType} </h1>
        </div>

        <SearchInput
          initialMovies={initialMovies}
          type="generalSearch"
          placeholder="Type the first movie that comes to your mind and press enter..."
          searchedMovieProps={(getMovies) => setMovies(getMovies)} />

        <div className="movies-filter">
          <div className="d-flex align-items-center">
            <RadioButtons currentMediaType={mediaType} />
            <DateSelect />
          </div>
          <SearchInput
            initialMovies={initialMovies}
            type=""
            placeholder="Search for a movie title from the table..."
            searchedMovieProps={(getMovies) => setMovies(getMovies)} />
        </div>

        <Table
          dataSource={movies}
          columns={tableColumns}
          loading={loading}
          pagination={false}
        />
        <TablePagination />
      </div>
    </div>
  );
};

export default Movies; 