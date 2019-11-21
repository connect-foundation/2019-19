/* eslint-disable no-shadow */
import { useState, useRef, useEffect } from 'react';
import { element } from 'prop-types';

const PADDINGS = 110;

const useSliding = (elementWidth, countElements) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0); // container 넓이
  const [distance, setDistance] = useState(0); // 이동 거리
  const [totalInViewport, setTotalInViewport] = useState(0); //
  const [viewed, setViewed] = useState(0);
  const [value, setValue] = useState(0);
  console.log(elementWidth);
  if (elementWidth !== 0 && distance === 0) setDistance(-elementWidth);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS;

    setContainerWidth(containerWidth);
    setTotalInViewport(Math.floor(containerWidth / elementWidth));
  }, [containerRef.current]); // containerRef.current가 변경될 때만 함수 실행

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
    if (distance === -elementWidth) {
      setDistance(-containerWidth * 3 - elementWidth);
      // setValue(-containerWidth * 3 - elementWidth);
    }
    // else {
    //   setValue(0);
    // }
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth);
    if (distance === -containerWidth * 3 - elementWidth) {
      setDistance(-elementWidth);
      // setValue(-elementWidth);
    }
    //  else {
    //   setValue(0);
    // }
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  // const slideInit = {
  //   style: {
  //     transform: `translate3d(${value}px, 0, 0)`,
  //     transition: `transform 0`,
  //   },
  // };

  // const hasPrev = distance < 0;
  // const hasNext = viewed + totalInViewport < countElements;

  const hasNext = 1; // 버튼 표시 유무
  const hasPrev = 1;

  return {
    handlePrev,
    handleNext,
    slideProps,
    // slideInit,
    containerRef,
    hasPrev,
    hasNext,
  };
};

export default useSliding;
