import React, { useState } from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  display: flex;
  direction: row;
`;

const Star = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: ${props => (props.isFilled ? '#FFD700' : '#e4e5e9')};
`;

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => setHover(value);

  const handleMouseLeave = () => setHover(0);

  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={index}
            isFilled={starValue <= (hover || rating)}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </Star>
        );
      })}
    </StarContainer>
  );
};

export default StarRating;