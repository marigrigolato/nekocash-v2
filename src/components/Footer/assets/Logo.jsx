import React from 'react';

const Logo = ({ color }) => {
  return (
    <svg height="4.7em" version="1.1" viewBox="0 -20 460 180" width="17.5em" xmlns="http://www.w3.org/2000/svg">
      <g fill={color || '#555555'}>
        <ellipse cx="200" cy="220" rx="195" ry="180"/>
        <g overflow="visible" transform="translate(110 130)">
          <path transform="rotate(-32)" d="m -85 0 c 0 -5 55 -150 85 -150 c 30 0 85 145 85 150"/>
        </g>
        <g overflow="visible" transform="translate(290 130)">
          <path transform="rotate(32)" d="m -85 0 c 0 -5 55 -150 85 -150 c 30 0 85 145 85 150"/>
        </g>
      </g>
    </svg>
  );
}

export default Logo;
