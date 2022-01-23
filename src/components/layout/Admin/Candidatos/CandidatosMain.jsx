import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAlumnos } from '../../../../store/slices/alumnos';
import SortableDataTable from '../../../sortableDataTable/SortableDataTable';
import TableNavbar from '../TableNavbar';

const CandidatosMain = () => {
  const alumnosList = useSelector((state) => state.alumnos.list);
  const [state, setState] = useState(alumnosList);
  const [query, setQuery] = useState('');
  const searchableColumns = ['nombre', 'ubicación', 'estado'];
  const dispatch = useDispatch();

  // Search method
  const search = (data) => {
    return data.filter((row) => searchableColumns.some(
      (column) => row[column]
        .toString()
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1,
    ));
  };
  // UseEffect to dispatch getAllAlumnos
  useEffect(() => {
    dispatch(fetchAllAlumnos);
  }, [dispatch]);
  // UseEffect to dispatch getAllAlumnos
  useEffect(() => {
    setState(alumnosList);
  }, [alumnosList]);
  // UseEffect to dispatch search filter
  useEffect(() => {
    setTimeout(setState(search(alumnosList)));
  }, [query]);

  console.log(alumnosList);

  return (
    <div className="candidatos-main">
      <TableNavbar
        title="Candidatos"
        searchPlaceholder="Buscar por Nombre, Ubicación o palabra clave..."
        query={query}
        setQuery={setQuery}
        buttonLabel="Añadir candidato"
      />
      <SortableDataTable
        data={state}
        columns={[
          { label: 'nombre', sortable: true, link: { to: 'id' } },
          { label: 'ubicación', sortable: true },
          { label: 'teléfono', sortable: false, isNum: true },
          { label: 'tecnologías', sortable: true, isTag: true },
          { label: 'estado', sortable: true, isState: true },
        ]}
      />
    </div>
  );
};

export default CandidatosMain;
