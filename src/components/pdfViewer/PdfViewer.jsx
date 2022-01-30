/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../spinner/Spinner';
/** Style */
import './pdfViewer.scss';

const PdfViewer = () => {
  const candidatoState = useSelector((state) => state.candidatos);
  let candidatoDetail = false;
  if (candidatoState.detail) {
    // eslint-disable-next-line prefer-destructuring
    candidatoDetail = candidatoState.detail[0];
  }

  return (
    <div className="curriculum">
      {
        candidatoDetail ? (
          candidatoDetail.cv ? (
            <object id="pdf-viewer" data={candidatoDetail.cv.url} type="application/pdf" aria-label="Lector de pdf" className="pdf-viewer" />
          ) : (
            <h2>Este candidato no tiene un curriculum disponible.</h2>
          )
        ) : (
          <div className="spinner-container">
            <Spinner />
          </div>
        )
      }
    </div>
  );
};

export default PdfViewer;
