import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from 'antd';

//Store
import { RootState } from '../store';
import { getMovieList, selectedMovieYear, selectedPage } from '../store/movieReducer';

//Utils
import { dateColumns } from '../utils/dateColumns';

const DateSelect: React.FC = () => {
  const dispatch = useDispatch < any > ();
  const currentYear = useSelector((state: RootState) => state.movieSlice.currentYear);

  const selectedDate = async (value: string) => {
    await dispatch(selectedPage(1))
    await dispatch(selectedMovieYear(value))
    dispatch(getMovieList())
  };

  const resetFilter = () => {
    dispatch(selectedMovieYear(null));
    dispatch(getMovieList());
  }

  return (
    <div className='d-flex align-items-center'>
      <Select
        showSearch
        placeholder="Tarih Seçin"
        onChange={selectedDate}
        value={currentYear}
        options={dateColumns}
      />
      {currentYear &&
        <span onClick={() => resetFilter()}>Tarihi Sıfırla</span>
      }
    </div>
  );
};

export default DateSelect; 