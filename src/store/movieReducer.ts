import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MovieState, initialState } from '../types'
import axios from 'axios'

export const getMovieList = createAsyncThunk("getMovieList", async (_, { getState }) => {
  const appState = getState() as MovieState
  const state = appState.movieSlice;
  console.log(process.env)
  try {
    const response = await axios.get(`${process.env.REACT_APP_OMDB_BASE_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${state.currentMediaType}&y=${state.currentYear}&page=${state.activePage}`);
    return response.data.Search
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

export const getMovieDetail = createAsyncThunk("getMovieDetail", async (data: { imdbId: string }) => {
  const { imdbId } = data
  try {
    const response = await axios.get(`${process.env.REACT_APP_OMDB_BASE_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${imdbId}`);
    return response.data
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

export const getMovieListSearch = createAsyncThunk("getMovieListSearch", async (data: { title: string }) => {
  const { title } = data
  try {
    const response = await axios.get(`${process.env.REACT_APP_OMDB_BASE_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&t=${title}`);
    if (response.data.Response == "False")
      return { "imdbID": "notFound" }
    else
      return response.data
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
});

export const { reducer, actions } = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    selectedMovieYear(state, action) {
      state.currentYear = action.payload
    },
    selectedType(state, action) {
      state.currentMediaType = action.payload
    },
    selectedPage(state, action) {
      state.activePage = action.payload
    },
    removeNotFoundMessage(state, action) {
      state.searchedMovieImdbId = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase((getMovieList.pending), (state) => {
      state.loading = true;
    })
    builder.addCase((getMovieList.fulfilled), (state, action) => {
      state.movies = action.payload
      state.loading = false
    })
    builder.addCase((getMovieDetail.pending), (state, action) => {
      state.movieDetail = null
    })
    builder.addCase((getMovieDetail.fulfilled), (state, action) => {
      state.movieDetail = action.payload
    })
    builder.addCase((getMovieListSearch.fulfilled), (state, action) => {
      if (action.payload.imdbID !== "notFound") {
        state.movieDetail = action.payload
        window.location.href = `/movie-detail/${action.payload.imdbID}`
      }
      else
        state.searchedMovieImdbId = action.payload.imdbID
    })
  },
});

export const { selectedMovieYear, selectedType, selectedPage, removeNotFoundMessage } = actions
export const movieSlice = reducer