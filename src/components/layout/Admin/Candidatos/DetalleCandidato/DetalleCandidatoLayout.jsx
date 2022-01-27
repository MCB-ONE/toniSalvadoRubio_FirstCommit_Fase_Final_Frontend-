import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCandidatoById } from '../../../../../store/slices/candidatos';
import Breadcrumbs from '../../../../breadcrumbs/Breadcrumbs';
/* Styles */
import './detalleCandidato.scss';
import DetalleCandidatoMain from './DetalleCandidatoMain';
import DetalleCandidatoSidebar from './DetalleCandidatoSidebar';

const DetalleCandidatoLayout = () => {
  // Retrive candidato id from utl path
  const candidatoId = useParams().id;
  const dispatch = useDispatch();

  // Dispathc getCandidatoById
  useEffect(() => {
    dispatch(getCandidatoById(candidatoId));
  }, []);
  return (
    <div className="detalle-candidato ">
      <Breadcrumbs />
      <div className="layout">
        <DetalleCandidatoMain />
        <DetalleCandidatoSidebar />
      </div>
    </div>
  );
};

export default DetalleCandidatoLayout;
