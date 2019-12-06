import React from 'react';

const Backward = () => {
  return (
    <g stroke="none" strokeWidth="1" fill="none">
      <path
        d="M21.9992616,8.99804242 C23.2555293,10.6696987 24,12.7479091 24,15 C24,20.5228475 19.5228475,25 14,25 C8.4771525,25 4,20.5228475 4,15 C4,9.4771525 8.4771525,5 14,5 L16,5"
        stroke="white"
        strokeWidth="2"
        transform="translate(14.000000, 15.000000) scale(-1, 1) translate(-14.000000, -15.000000) "
      />
      <polyline
        stroke="white"
        strokeWidth="2"
        points="15.5 1.5 12 4.92749023 15.5 8.5"
      />
      <polyline stroke="white" strokeWidth="2" points="11 1.5 7.5 5 11 8.5" />
      <text fontSize="10" fontWeight="400" letterSpacing="-0.3" fill="white">
        <tspan x="8" y="19">
          10
        </tspan>
      </text>
    </g>
  );
};

export default Backward;
