import React from 'react';
import PropTypes from 'prop-types';
import '../layout/Admin/Candidatos/candidatos.scss';

import { IoClose } from 'react-icons/io5';

/* Modal styles */
import './modal.scss';
import CandidatoCreateForm from '../forms/CandidatoCreateForm';

const Modal = ({ state, changeState }) => {
  return (
    <>
      {state && (
        <div className="overlay">
          <div className="cm-modal-content">
            <div className="modal-header">
              <h3>Nuevo candidato</h3>
              <IoClose className="modal-close" onClick={() => changeState(false)} />
            </div>
            <div className="modal-main">
              <CandidatoCreateForm changeState={changeState} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  state: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
};

export default Modal;
