import React, { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { getAllClientes } from '../../../../store/slices/clientes';

const ClientesFilter = () => {
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();
  // Method to call api query
  const filterHandler = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getAllClientes(new URLSearchParams(filters).toString()));
  }, [filters]);

  const clearFilters = () => {
    setFilters({});
    // Api call without filters
    dispatch(getAllClientes(new URLSearchParams(filters).toString()));
  };

  return (
    <div className="candidatos-filters">
      <div className="filters-form">
        <div className="row justify-content-between">
          <h5 className="col-auto section-title">Filtros de búsqueda</h5>
          <IoTrashOutline className="col-auto cm-text--green pointer" onClick={clearFilters} />
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              required
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre de la empresa..."
              name="nombre"
              onBlur={filterHandler}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="sector" className="form-label">Sector</label>
            <input
              required
              type="text"
              className="form-control"
              id="sector"
              placeholder="Sector de la empresa..."
              name="sector"
              onBlur={filterHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientesFilter;
