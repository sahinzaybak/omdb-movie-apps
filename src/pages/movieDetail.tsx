import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../style/movieDetail.scss'

import { Skeleton } from 'antd';
import Moment from 'react-moment';
import 'moment/locale/tr';

//Store
import { RootState } from '../store';
import { getMovieDetail } from '../store/movieReducer';

const MovieDetail: React.FC = () => {
  const { imdbId } = useParams();
  const dispatch = useDispatch < any > ();
  const movie = useSelector((state: RootState) => state.movieSlice.movieDetail);

  useEffect(() => {
    dispatch(getMovieDetail({ "imdbId": imdbId }));
  }, []);

  return (
    <div className="movie-detail">
      {movie ?
        <div className="movie" style={{ backgroundImage: `url(${movie.Poster})` }}>
          <div className="container">
            <div className="movie-wrp">
              <div className="row">
                <div className="col-md-4">
                  <img src={movie.Poster} alt="" width="100%" />
                </div>
                <div className="col-md-8">
                  <div className="movie-top">
                    <span className="movie-type">{movie.Type}</span>
                    <span className="movie-type">{movie.Country}</span>
                  </div>
                  <h2 className="movie-title">{movie.Title}</h2>
                  <p className="movie-desc">{movie.Plot}</p>
                  <div className="movie-info">
                    <div className="movie-info__item">
                      <span><i className="fi fi-sr-clapperboard-play"></i>Actors</span>
                      <p>{movie.Actors}</p>
                    </div>
                    <div className="movie-info__item">
                      <span><i className="fi fi-sr-calendar-lines"></i>Released Date</span>
                      <p><Moment locale="tr" format="DD MMMM YYYY" date={movie.Released} /></p>
                    </div>
                    <div className="movie-info__item">
                      <span><i className="fi fi-sr-camera-movie"></i>Director</span>
                      <p>{movie.Director}</p>
                    </div>
                    <div className="movie-info__item">
                      <span><i className="fi fi-sr-clock"></i>Runtime</span>
                      <p>{movie.Runtime}</p>
                    </div>
                
                    <div className="movie-info__item">
                      <span><i className="fi fi-sr-ranking-star"></i>IMDB</span>
                      <p>{movie.imdbRating}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="skeleton container">
          <Skeleton active />
        </div>
      }
    </div>
  );
};

export default MovieDetail; 