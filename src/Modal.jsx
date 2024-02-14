import './Modal.css';
import PropTypes from 'prop-types';

function DisplayModal({ outcome, modalDisplay, setModalDisplay }) {
  return (
    <div className={'modal-overlay ' + (modalDisplay ? 'show' : 'hide')}>
      <div className={'modal ' + (modalDisplay ? 'show' : 'hide')}>
        <h1>YOU {outcome}!</h1>
        <button onClick={() => setModalDisplay(false)}>Retry?</button>
      </div>
    </div>
  );
}

DisplayModal.propTypes = {
  outcome: PropTypes.string,
  modalDisplay: PropTypes.bool,
  setModalDisplay: PropTypes.func,
};

export default DisplayModal;
