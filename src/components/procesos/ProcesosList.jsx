import React from 'react';
import PropTypes from 'prop-types';
/** Styles */
import './procesosList.scss';

const ProcesosList = ({ procesos }) => {
  console.log(procesos);
  // Conditional styles for estado labels
  const renderSwitch = (value) => {
    switch (value) {
      case 'Contratado':
        return 'contratado';
      case 'PDTE. Entrevista':
        return 'pendiente';
      case 'Esperando CV':
        return 'esperando';
      case 'Entrevistado':
        return 'esperando';
      case 'Rechazado':
        return 'rechazado';
      default:
        return 'pendiente';
    }
  };
  return (
    <div className="procesos-list">
      {procesos && procesos.map((proceso) => {
        return (
          <div className="item" key={proceso.id}>
            <div className="title">
              <p>Título Oferta</p>
              <span>{proceso.titulo}</span>
            </div>
            <div className="candidatos">
              <p className="num">{proceso.candidatos}</p>
            </div>
            <div className="candidatos">
              <span>Fecha plazo</span>
              <p className="num">{proceso.fecha}</p>
            </div>
            <div className="estado">
              <span className={renderSwitch(proceso.estado)}>{proceso.estado}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProcesosList.propTypes = {
  procesos: PropTypes.array.isRequired,
};

export default ProcesosList;
