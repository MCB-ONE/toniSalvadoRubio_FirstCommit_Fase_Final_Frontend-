/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandidatos } from '../../../../store/slices/candidatos';
import SortableDataTable from '../../../sortableDataTable/SortableDataTable';
import TableNavbar from '../TableNavbar';

const CandidatosMain = () => {
  const dispatch = useDispatch();
  const alumnosList = useSelector((state) => state.candidatos);
  /* const [state, setState] = useState(); */

  const initFetch = useCallback(() => {
    dispatch(getAllCandidatos());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="candidatos-main">
      {alumnosList.list != null
        ? (
          <SortableDataTable
            data={alumnosList.list}
            columns={[
              {
                label: 'nombre', row: 'nombreCompleto', sortable: true, link: { to: 'id' },
              },
              {
                label: 'ubicación', row: ['ciudad', 'País'], sortable: true, double: true,
              },
              {
                label: 'teléfono', row: 'telefono', sortable: false, isNum: true,
              },
              {
                label: 'tecnologías', row: 'tecnologias', sortable: true, isTag: true,
              },
              {
                label: 'estado', row: 'estado', sortable: true, isState: true,
              },
            ]}
          />
        ) : 'No hay data'}
    </div>
  );
};

export default CandidatosMain;
