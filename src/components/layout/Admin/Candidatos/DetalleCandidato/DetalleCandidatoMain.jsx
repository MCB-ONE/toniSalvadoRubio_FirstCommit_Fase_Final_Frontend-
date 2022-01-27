import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import Spinner from '../../../../spinner/Spinner';
import CandidatoInfoForm from '../../../../forms/CandidatoInfoForm';

const detalleCandidatoMain = () => {
  const candidatoDetail = useSelector((state) => state.candidatos);
  const [candidatoData, setCandidatoData] = useState(false);

  // Dispathc getCandidatoById
  useEffect(() => {
    if (candidatoDetail.detail) {
      setCandidatoData(candidatoDetail.detail[0]);
    } else {
      setCandidatoData(false);
    }
  }, [candidatoDetail]);

  const renderSwitchClass = (value) => {
    switch (value) {
      case 'contratado':
        return 'success';
      case 'en_proceso':
        return 'pending';
      case 'libre':
        return 'free';
      case 'descartado':
        return 'error';
      default:
        return 'free';
    }
  };
  return (
    <div className="main col-8 pe-0">
      { candidatoData ? (
        <>
          <div className="info">
            <img src="/images/candidate-default-img.jpeg" alt="imagen de perfil" />
            <div className="profile row">
              <div className="profile-location col-auto">
                <h1>{candidatoData.nombreCompleto}</h1>
                <div>
                  <IoLocationOutline />
                  <p>
                    {candidatoData.ciudad}
                    ,
                    {' '}
                    {candidatoData.pais}
                  </p>
                </div>
                <div>
                  <MdMyLocation />
                  <p>
                    {candidatoData.remoto ? 'En remoto' : 'Presencial'}
                    ,
                    {' '}
                    {candidatoData.disponibilidadTraslado ? 'Traslado disponible' : 'Sin traslado'}
                  </p>
                </div>
              </div>
              <div className="profile-status col-auto estado">
                <p>Estado del candidato:</p>
                <span className={renderSwitchClass(candidatoData.estado)}>
                  {candidatoData.estado}
                </span>
              </div>
            </div>
          </div>
          <CandidatoInfoForm />
        </>
      )
        : (
          <div className="spinner-container">
            <Spinner />
          </div>
        ) }
    </div>
  );
};

export default detalleCandidatoMain;
