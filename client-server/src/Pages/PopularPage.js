import React from 'react';
import Slider from '../components/Carousels/NetflixSlider';

const ImgUrlJpg = id => `https://picsum.photos/id/${id}/341/192`;
const ImgUrlWebp = id => `https://picsum.photos/id/${id}/848/477`;

const movies = [
  {
    id: 10,
    image: ImgUrlJpg(10),
    imageBg: ImgUrlWebp(10),
    title: 'Black mirror',
  },
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
  {
    id: 7,
    image: ImgUrlJpg(7),
    imageBg: ImgUrlWebp(7),
    title: 'Black mirror',
  },
  {
    id: 8,
    image: ImgUrlJpg(8),
    imageBg: ImgUrlWebp(8),
    title: 'Black mirror',
  },
  {
    id: 9,
    image: ImgUrlJpg(9),
    imageBg: ImgUrlWebp(9),
    title: 'Black mirror',
  },
  {
    id: 10,
    image: ImgUrlJpg(10),
    imageBg: ImgUrlWebp(10),
    title: 'Black mirror',
  },
  {
    id: 11,
    image: ImgUrlJpg(11),
    imageBg: ImgUrlWebp(11),
    title: '1983',
  },
  {
    id: 12,
    image: ImgUrlJpg(12),
    imageBg: ImgUrlWebp(12),
    title: 'Russian doll',
  },
  {
    id: 13,
    image: ImgUrlJpg(13),
    imageBg: ImgUrlWebp(13),
    title: 'The rain',
  },
  {
    id: 14,
    image: ImgUrlJpg(14),
    imageBg: ImgUrlWebp(14),
    title: 'Sex education',
  },
  {
    id: 15,
    image: ImgUrlJpg(1),
    imageBg: ImgUrlWebp(15),
    title: 'Elite',
  },
  {
    id: 16,
    image: ImgUrlJpg(16),
    imageBg: ImgUrlWebp(16),
    title: 'Black mirror',
  },
  {
    id: 17,
    image: ImgUrlJpg(17),
    imageBg: ImgUrlWebp(17),
    title: 'Black mirror',
  },
  {
    id: 18,
    image: ImgUrlJpg(18),
    imageBg: ImgUrlWebp(18),
    title: 'Black mirror',
  },
  {
    id: 19,
    image: ImgUrlJpg(19),
    imageBg: ImgUrlWebp(19),
    title: 'Black mirror',
  },
  {
    id: 20,
    image: ImgUrlJpg(20),
    imageBg: ImgUrlWebp(20),
    title: 'Black mirror',
  },
  {
    id: 1,
    image: ImgUrlJpg(1),
    imageBg: ImgUrlWebp(1),
    title: '1983',
  },
];

const Popular = () => {
  return (
    <>
      <Slider>
        {movies.map(movie => (
          <Slider.Item movie={movie} key={movie.id}>
            item1
          </Slider.Item>
        ))}
      </Slider>

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
