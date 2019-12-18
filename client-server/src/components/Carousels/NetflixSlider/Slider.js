/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useContext } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SliderContext from './context';
import { PreviewPlayContext } from '../../../contexts/PreviewPlayContext';
import Content from './Content';
import SlideButton from './SlideButton';
import SliderWrapper from './SliderWrapper';
import useSliding from './useSliding';
import useSizeElement from './useSizeElement';
import './Slider.scss';

const Slider = ({ categoryName, children, activeSlide }) => {
  const { setDetailPreviewPlaying } = useContext(PreviewPlayContext);
  const [currentSlide, setCurrentSlide] = useState(activeSlide);
  const { width, elementRef } = useSizeElement();
  const {
    handlePrev,
    handleNext,
    slideProps,
    containerRef,
    hasNext,
    hasPrev,
  } = useSliding(width, React.Children.count(children));

  const handleSelect = movie => {
    setCurrentSlide(movie);
  };

  const handleClose = () => {
    setCurrentSlide(null);
    setDetailPreviewPlaying(false);
  };

  const contextValue = {
    onSelectSlide: handleSelect,
    onCloseSlide: handleClose,
    elementRef,
    currentSlide,
  };

  return (
    <div
      style={{
        marginTop: '0rem',
      }}
    >
      <SliderContext.Provider value={contextValue}>
        <h2 className="slider__title">{categoryName}</h2>
        <SliderWrapper>
          <div
            className={cx('slider', { 'slider--open': currentSlide != null })}
          >
            <div
              ref={containerRef}
              className="slider__container"
              {...slideProps}
            >
              {children}
            </div>
          </div>
          {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
          {hasNext && <SlideButton onClick={handleNext} type="next" />}
        </SliderWrapper>
        {currentSlide && <Content movie={currentSlide} onClose={handleClose} />}
      </SliderContext.Provider>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.any.isRequired,
  activeSlide: PropTypes.any,
  categoryName: PropTypes.string,
};

export default Slider;
