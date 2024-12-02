import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Pages
import MovieDetail from './pages/movieDetail';
import Movies from './pages/movies';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='/movie-detail/:imdbId' element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default App; 