import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

//Store
import { RootState } from '../store';
import { getMovieListSearch, removeNotFoundMessage } from '../store/movieReducer';

//Type
import { Movie } from '../types'

interface SearchInputProps {
  placeholder: string;
  type: string;
  initialMovies: Movie[];
  searchedMovieProps: (value: Movie[]) => void;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const { placeholder, type, initialMovies } = props
  const searchedMovieImdbId = useSelector((state: RootState) => state.movieSlice.searchedMovieImdbId);
  const dispatch = useDispatch < any > ();

  const searchingTableMovie = (e) => {
    const searchText = e.target.value;
    if (searchText) {
      const getMovies = initialMovies.filter(movie => movie.Title.toLowerCase().includes(searchText.toLowerCase()));
      props.searchedMovieProps(getMovies)
    } else {
      props.searchedMovieProps(initialMovies)
    }
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter')
      dispatch(getMovieListSearch({ "title": e.target.value }));
  }

  const searchingAllMovie = (e) => {
    if (e.target.value.length == 0)
      dispatch(removeNotFoundMessage(""));
  }
  return (
    <div>
      {type !== "generalSearch" ?
        <div className="mt-4 mb-3">
          <Input placeholder={placeholder} onKeyUp={(e) => searchingTableMovie(e)} />
        </div>
        :
        <div className="mb-3">
          <Input placeholder={placeholder} onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => searchingAllMovie(e)} />
          {searchedMovieImdbId == "notFound" &&
            <p>The movie you are looking for could not be found, you can search for another movie.</p>
          }
        </div>
      }
    </div>
  );
};

export default SearchInput