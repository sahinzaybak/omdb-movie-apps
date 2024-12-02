import React from 'react';
import { useDispatch } from 'react-redux';
import { Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

//Store
import { getMovieList, selectedType,selectedPage } from '../store/movieReducer';

interface RadioProps {
  currentMediaType: string;
}

const RadioButtons: React.FC<RadioProps> = (props) => {
  const { currentMediaType } = props
  const dispatch = useDispatch <any> ();

  const changeRadioButton = async (e: RadioChangeEvent) => {
    const selectedRadioText = e.target.value;
    await dispatch(selectedPage(1))
    await dispatch(selectedType(selectedRadioText))
    dispatch(getMovieList())
  }

  return (
    <div>
      <Radio.Group onChange={changeRadioButton} value={currentMediaType}>
        <Radio value="movie">Movies</Radio>
        <Radio value="series">Series</Radio>
        <Radio value="episode">Episode</Radio>
      </Radio.Group>
    </div>
  );
};

export default RadioButtons; 