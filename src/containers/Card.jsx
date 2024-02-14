import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Card({ id, data, handleClick, flipStatus }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={
        'card ' + (isHovered ? 'hover ' : '') + (flipStatus ? 'flip ' : '')
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={'card-front ' + (flipStatus ? 'hide' : '')}>
        <img
          src={data[id].sprites.other.dream_world.front_default}
          alt={data[id].name}
          onClick={() => handleClick(data[id].name)}
        />
        <p>{data[id].name}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func,
  flipStatus: PropTypes.bool,
};
