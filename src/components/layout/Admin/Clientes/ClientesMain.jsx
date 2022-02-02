import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SortableDataTable from '../../../sortableDataTable/SortableDataTable';
import Spinner from '../../../spinner/Spinner';
import TableNavbar from '../TableNavbar';
import { getAllClientes, resetDetail } from '../../../../store/slices/clientes';
import Pagination from '../../../pagination/Pagination';

const ClientesMain = () => {
  const dispatch = useDispatch();
  const clientesList = useSelector((state) => state.clientes);
  const [clientesData, setClientesData] = useState(clientesList);
  const pages = useSelector((state) => state.clientes.pagination);
  // Clientes query
  const [query, setQuery] = useState('');
  // Setting a searchable column list
  const searchableColumns = ['nombre', 'email', 'sector', 'personaContacto', 'telefono'];

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
    dispatch(getAllClientes());
    dispatch(resetDetail());
  }, []);

  useEffect(() => {
    setClientesData(clientesList);
  }, [clientesList]);

  // Pagination handler
  const changePage = (page) => {
    const queryConfig = {
      page,
    };
    dispatch(getAllClientes(queryConfig));
  };

  if (!clientesData.list) {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="candidatos-main">
      <TableNavbar
        title="Clientes"
        searchPlaceholder="Buscar por Nombre, ciudad o palabra clave..."
        query={query}
        setQuery={setQuery}
        buttonLabel="Añadir cliente"
      />
      <SortableDataTable
        data={search(clientesData.list)}
        columns={[
          {
            label: 'nombre', row: 'nombre', sortable: true, isLink: true, isNum: false, isState: false, isTag: false, isDouble: false,
          },
          {
            label: 'persona Contacto', row: 'personaContacto', sortable: true, isNum: false, isState: false, isTag: false, isDouble: false,
          },
          {
            label: 'teléfono', row: 'telefono', sortable: false, isNum: true, isState: false, isTag: false, isDouble: false,
          },
          {
            label: 'email', row: 'email', sortable: true, isState: false, isNum: false, isTag: false, isDouble: false,
          },
          {
            label: 'sector', row: 'sector', sortable: true, isState: false, isNum: false, isTag: false, isDouble: false,
          },
        ]}
      />
      <Pagination pages={pages} changePage={changePage} />
    </div>
  );
};

export default ClientesMain;
