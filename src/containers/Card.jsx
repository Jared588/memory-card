import PropTypes from 'prop-types';

export default function Card({ id, data }) {
    return (
        <div className='card'>
            <img src={data[id].sprites.other.dream_world.front_default} alt={data[id].name} />
            <p>{data[id].name}</p>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired
}