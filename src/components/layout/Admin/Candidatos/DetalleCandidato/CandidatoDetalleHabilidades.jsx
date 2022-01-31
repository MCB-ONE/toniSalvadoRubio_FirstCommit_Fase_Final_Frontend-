/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTecnologias } from '../../../../../store/slices/tecnologias';
import TagSelector from '../../../../tags/TagSelector';

const CandidatoDetalleHabilidades = () => {
  const tecnologiasState = useSelector((state) => state.tecnologias);
  const candidatoState = useSelector((state) => state.candidatos);
  let candidatoDetail = false;
  let tecnologias = false;
  if (candidatoState.detail && tecnologiasState.list) {
    candidatoDetail = candidatoState.detail[0];
    tecnologias = tecnologiasState.list;
  }
  const dispatch = useDispatch();

  // Dispathc getAllTec
  useEffect(() => {
    dispatch(getAllTecnologias());
  }, [candidatoState]);
  return (
    <div className="candidato-habilidades row">
      {
        tecnologias && (
          <>
            <TagSelector
              options={tecnologias}
              defaultSelectedTags={candidatoDetail.tecnologias}
              field="tecnologias"
              candidatoId={candidatoDetail.id}
            />
            {/*  //TODO UPDATE IDIOMS SELECTOR */}
            {/* <TagSelector options={idiomas.list} /> */}
          </>
        )
      }
    </div>
  );
};

export default CandidatoDetalleHabilidades;
