import React from 'react';
import Slider from '../components/Carousels/NetflixSlider';

const ImgUrlJpg = id => `https://picsum.photos/id/${id}/341/192`;
const ImgUrlWebp = id => `https://picsum.photos/id/${id}/848/477`;

const movies = [
  {
    id: 1,
    image: ImgUrlJpg(1),
    imageBg: ImgUrlWebp(1),
    title: '1983',
  },
  {
    id: 2,
    image: ImgUrlJpg(2),
    imageBg: ImgUrlWebp(2),
    title: 'Russian doll',
  },
  {
    id: 3,
    image: ImgUrlJpg(3),
    imageBg: ImgUrlWebp(3),
    title: 'The rain',
  },
  {
    id: 4,
    image: ImgUrlJpg(4),
    imageBg: ImgUrlWebp(4),
    title: 'Sex education',
  },
  {
    id: 5,
    image: ImgUrlJpg(5),
    imageBg: ImgUrlWebp(5),
    title: 'Elite',
  },
  {
    id: 6,
    image: ImgUrlJpg(6),
    imageBg: ImgUrlWebp(6),
    title: 'Black mirror',
  },
];

const Popular = () => {
  console.log('start here');
  return (
    <>
      <Slider>
        {movies.map(movie => (
          <Slider.Item movie={movie} key={movie.id}>
            item1
          </Slider.Item>
        ))}
      </Slider>
    </>
  );
};

export default Popular;
