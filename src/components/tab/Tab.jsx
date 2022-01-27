import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import Button from '../button/Button';
import CandidatoDetalleHabilidades from '../layout/Admin/Candidatos/DetalleCandidato/CandidatoDetalleHabilidades';
import ProcesosList from '../procesos/ProcesosList';
import PdfViewer from '../pdfViewer/PdfViewer';

/** Style */
import './tab.scss';
import Spinner from '../spinner/Spinner';

const Tab = () => {
  const [toggleState, setToggleState] = useState(1);
  const candidatoState = useSelector((state) => state.candidatos);
  let candidatoDetail = false;
  if (candidatoState.detail) {
    // eslint-disable-next-line prefer-destructuring
    candidatoDetail = candidatoState.detail[0];
  }

  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <div className="tab">
      {
        candidatoDetail ? (
          <>
            <div className="bloc-tabs">
              <button
                type="button"
                className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
                onClick={() => toggleTab(1)}
              >
                Habilidades
              </button>
              <button
                type="button"
                className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
                onClick={() => toggleTab(2)}
              >
                Currículum Vitae
              </button>
              <button
                type="button"
                className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
                onClick={() => toggleTab(3)}
              >
                Procesos
                {' '}
                {candidatoDetail && <span>{candidatoDetail.ofertas.length}</span>}
              </button>
            </div>
            <div className="content-tabs">
              <div
                className={toggleState === 1 ? 'content  active-content' : 'content'}
              >
                <CandidatoDetalleHabilidades />
              </div>
              <div
                className={toggleState === 2 ? 'content  active-content' : 'content'}
              >
                <PdfViewer />
              </div>
              <div
                className={toggleState === 3 ? 'content  active-content' : 'content'}
              >
                <Button
                  label="Añadir proceso"
                  variant="outline"
                  color="light"
                >
                  <IoMdAdd />
                </Button>
                {
                  candidatoDetail && candidatoDetail.ofertas.length > 0 ? (
                    <ProcesosList procesos={candidatoDetail.ofertas} />
                  )
                    : <p className="mt-3">Actualmente este candidato no tiene procesos de selección activos.</p>
                }
              </div>
            </div>
          </>

        ) : (
          <div className="spinner-container">
            <Spinner />
          </div>
        )
      }
    </div>
  );
};

export default Tab;
