/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoLocationOutline } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import Spinner from '../../../../spinner/Spinner';
import CandidatoInfoForm from '../../../../forms/CandidatoInfoForm';

const detalleCandidatoMain = () => {
  const candidatoState = useSelector((state) => state.candidatos);
  let candidatoDetail = false;
  if (candidatoState.detail) {
    // eslint-disable-next-line prefer-destructuring
    candidatoDetail = candidatoState.detail[0];
  }

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
      { candidatoDetail ? (
        <>
          <div className="info">
            <img src="/images/candidate-default-img.jpeg" alt="imagen de perfil" />
            <div className="profile row">
              <div className="profile-location col-auto">
                <h1>{candidatoDetail.nombreCompleto}</h1>
                <div>
                  <IoLocationOutline />
                  <p>
                    {candidatoDetail.ciudad}
                    ,
                    {' '}
                    {candidatoDetail.pais}
                  </p>
                </div>
                <div>
                  <MdMyLocation />
                  <p>
                    {candidatoDetail.remoto ? 'En remoto' : 'Presencial'}
                    ,
                    {' '}
                    {candidatoDetail.disponibilidadTraslado
                      ? 'Traslado disponible' : 'Sin traslado'}
                  </p>
                </div>
              </div>
              <div className="profile-status col-auto estado">
                <p>Estado del candidato:</p>
                <span className={renderSwitchClass(candidatoDetail.estado)}>
                  {candidatoDetail.estado}
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
