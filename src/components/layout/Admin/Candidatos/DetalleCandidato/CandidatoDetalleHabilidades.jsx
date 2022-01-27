import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTecnologias } from '../../../../../store/slices/tecnologias';
import TagSelector from '../../../../tags/TagSelector';

const CandidatoDetalleHabilidades = () => {
  const candidatoDetail = useSelector((state) => state.candidatos);
  const tecnologias = useSelector((state) => state.tecnologias);
  const [candidatoData, setCandidatoData] = useState(false);
  const dispatch = useDispatch();

  // Dispathc getAllTec
  useEffect(() => {
    dispatch(getAllTecnologias());
  }, []);

  // Setting candidato data state
  useEffect(() => {
    if (candidatoDetail.detail) {
      setCandidatoData(candidatoDetail.detail[0]);
    } else {
      setCandidatoData(false);
    }
  }, [candidatoDetail]);
  return (
    <div className="candidato-habilidades row">
      {
        tecnologias.list && (
        <>
          <TagSelector options={tecnologias.list} defaultSelectedTags={candidatoData.tecnologias} />
          {/*  //TODO UPDATE IDIOMS SELECTOR */}
          {/* <TagSelector options={idiomas.list} /> */}
        </>
        )
      }
    </div>
  );
};

export default CandidatoDetalleHabilidades;
