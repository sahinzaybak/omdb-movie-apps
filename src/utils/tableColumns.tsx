import { Link } from "react-router-dom";
const defaultImage = 'https://www.inventanalytics.com/media/jeof2uv1/invent-main-og.png';

export const tableColumns = [
  {
    title: 'Poster',
    dataIndex: 'Poster',
    key: 'Poster',
    render: (_, record) => (
      <img
        src={record.Poster}
        onError={(e) => { e.currentTarget.src = defaultImage; }} // Resim yüklenmezse varsayılan resmi göster  
        style={{ width: 60, height: 60, borderRadius: '5px' }}
      />
    ),
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
    render: (movieTitle, movie) => <Link to={`movie-detail/${movie.imdbID}`}>{movieTitle}</Link>
  },
  {
    title: 'Year',
    dataIndex: 'Year',
    key: 'Year',
  },
  {
    title: 'ImdbID',
    dataIndex: 'imdbID',
    key: 'imdbID',
  },
];