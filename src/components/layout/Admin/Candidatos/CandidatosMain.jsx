import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandidatos, resetDetail } from '../../../../store/slices/candidatos';
import SortableDataTable from '../../../sortableDataTable/SortableDataTable';
import TableNavbar from '../TableNavbar';

const CandidatosMain = () => {
  const dispatch = useDispatch();
  const candidatosList = useSelector((state) => state.candidatos);
  const [candidatosData, setCandidatosData] = useState(candidatosList);
  const [query, setQuery] = useState('');
  // Setting a searchable column list
  const searchableColumns = ['nombreCompleto', 'estado', 'ciudad'];

  // Search method
  const search = (rows) => {
    return rows.filter((row) => searchableColumns.some(
      (column) => row[column]
        .toString()
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1,
    ));
  };

  useEffect(() => {
    dispatch(getAllCandidatos());
    dispatch(resetDetail());
  }, []);

  useEffect(() => {
    setCandidatosData(candidatosList);
  }, [candidatosList]);

  return (
    <div className="candidatos-main">
      {candidatosData.list
        ? (
          <>
            <TableNavbar
              title="Candidatos"
              searchPlaceholder="Buscar por Nombre, ciudad o palabra clave..."
              query={query}
              setQuery={setQuery}
              buttonLabel="Añadir candidato"
            />
            <SortableDataTable
              data={search(candidatosData.list)}
              columns={[
                {
                  label: 'nombre', row: 'nombreCompleto', sortable: true, isLink: true, isNum: false, isState: false, isTag: false, isDouble: false,
                },
                {
                  label: 'ubicación', row: ['ciudad', 'pais'], sortable: true, isNum: false, isState: false, isTag: false, isDouble: true,
                },
                {
                  label: 'teléfono', row: 'telefono', sortable: false, isNum: true, isState: false, isTag: false, isDouble: false,
                },
                {
                  label: 'tecnologías', row: 'tecnologias', sortable: true, isState: false, isNum: false, isTag: true, isDouble: false,
                },
                {
                  label: 'estado', row: 'estado', sortable: true, isState: true, isNum: false, isTag: false, isDouble: false,
                },
              ]}
            />
          </>
        ) : (
          <div className="data-error">
            <h2>No hay candidatos.</h2>
          </div>
        ) }
    </div>
  );
};

export default CandidatosMain;
