/* eslint-disable no-shadow */
import { useState, useRef, useEffect } from 'react';
import movies from '../data/movie';

const PADDINGS = 110;

const useSliding = (elementWidth, countElements) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0); // container 넓이
  const [distance, setDistance] = useState(0); // 이동 거리
  const [totalInViewport, setTotalInViewport] = useState(0); //
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS;
    if (elementWidth !== 0 && distance === 0) setDistance(-2 * containerWidth); // 초기 밀어줌

    setContainerWidth(containerWidth);
    setTotalInViewport(Math.floor(containerWidth / elementWidth));
  }, [containerRef.current]); // containerRef.current가 변경될 때만 함수 실행

  const slideProps = {
    style: {
      transform: `translate3d(${distance}px, 0, 0)`,
      transition: `transform 300ms ease 100ms`,
    },
  };

  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
    if (distance === -containerWidth) {
      setDistance(-containerWidth * 4);
    }
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth);
    if (distance === -containerWidth * 4) {
      setDistance(-containerWidth);
    }
  };
  console.log(slideProps);
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
    containerRef,
    hasPrev,
    hasNext,
  };
};

export default useSliding;
