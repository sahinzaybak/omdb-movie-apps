import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { getMovieList, selectedPage } from '../store/movieReducer';
import { Pagination } from 'antd';

const TablePagination: React.FC = () => {
  const dispatch = useDispatch < any > ();
  const activePage = useSelector((state: RootState) => state.movieSlice.activePage);

  const onChangePagination = async (activePage: number) => {
    await dispatch(selectedPage(activePage))
    dispatch(getMovieList());
  }

  return (
    <div className="pagination">
      <Pagination
        total={50}
        onChange={onChangePagination}
        current={activePage} />
    </div>
  );
};

export default TablePagination; 