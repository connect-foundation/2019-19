import React from 'react';
import Slider from '../Carousels/NetflixSlider';

const ScrollFakeUI = ({ numOfContents }) => {
  const NUM_OF_SLIDES = [...Array(numOfContents).keys()];
  return (
    <Slider>
      {NUM_OF_SLIDES.map((content, index) => (
        <Slider.Item
          movie={{
            thumbnail_img_url:
              'https://media1.tenor.com/images/9d1ce360e6b0f62e66cfc2ac0986ef5c/tenor.gif',
          }}
          key={index}
        />
      ))}
    </Slider>
  );
};

export default ScrollFakeUI;
