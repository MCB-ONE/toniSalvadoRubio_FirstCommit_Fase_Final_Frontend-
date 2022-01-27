import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import Button from '../button/Button';
import CandidatoDetalleHabilidades from '../layout/Admin/Candidatos/DetalleCandidato/CandidatoDetalleHabilidades';
import ProcesosList from '../procesos/ProcesosList';
import PdfViewer from '../pdfViewer/PdfViewer';

/** Style */
import './tab.scss';

const Tab = () => {
  const [toggleState, setToggleState] = useState(1);
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
                {candidatoData && <span>{candidatoData.ofertas.length}</span>}
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
                  candidatoData && candidatoData.ofertas.length > 0 ? (
                    <ProcesosList procesos={candidatoData.ofertas} />
                  )
                    : <p className="mt-3">Actualmente este candidato no tiene procesos de selección activos.</p>
                }
              </div>
            </div>
          </>

        ) : null
      }
    </div>
  );
};

export default Tab;
