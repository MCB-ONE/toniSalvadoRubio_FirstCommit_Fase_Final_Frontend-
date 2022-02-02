import React, { useEffect, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import estados from '../../../../data/estados';
import countriesDataSet from '../../../../data/paises';
import Spinner from '../../../spinner/Spinner';
import { getAllCandidatos } from '../../../../store/slices/candidatos';
import TagSelector from '../../../tags/TagSelector';
import { getAllTecnologias } from '../../../../store/slices/tecnologias';

const CandidatosFilter = () => {
  const tecnologiasState = useSelector((reduxState) => reduxState.tecnologias);
  let techOptions = false;
  if (tecnologiasState.list) {
    techOptions = tecnologiasState.list;
  }
  // const [selectedTecnologias, setSelectedTecnologias] = useState(false);
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTecnologias());
  }, [dispatch]);

  // Method to format taglist to form data
  const arrayFormat = (array) => {
    const obj = array.reduce(
      (acc, cur) => (
        { ...acc, [cur.value]: {} }
      ), {},
    );
    return obj;
  };

  const filterHandler = (e) => {
    if (Array.isArray(e)) {
      const tech = arrayFormat(e);
      const techKeys = Object.keys(tech);
      let tecString = '';
      // Format to string
      techKeys.forEach((tec) => {
        tecString += `${tec}: 1,`;
      });

      // tech filter to format to query string array
      let tecQs = `${tecString}`;
      tecQs = tecQs.substring(0, tecQs.length - 1);
      tecQs = `[${tecQs}]`;
      if (tecQs === '[]') {
        tecQs = '';
        const { tecnologias, ...newFilters } = filters;
        setFilters(
          newFilters,
        );
      }
      if (tecQs !== '') {
        setFilters({
          ...filters,
          tecnologias: tecQs,
        });
      }
    } else if (e.target.name && e.target.value !== 'Seleccione un país') {
      const { name, value } = e.target;
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(filters).toString();
    const queryConfig = {
      query,
    };
    dispatch(getAllCandidatos(queryConfig));
  }, [filters]);

  const clearFilters = () => {
    setFilters({});
    dispatch(getAllCandidatos());
  };

  return (
    <div className="candidatos-filters">
      <div className="filters-form">
        {
        techOptions ? (
          <>
            <div className="row justify-content-between">
              <h5 className="col-auto section-title">Filtros de búsqueda</h5>
              <IoTrashOutline className="col-auto cm-text--green pointer" onClick={clearFilters} />
            </div>
            <form>
              <div className="col-12 mb-3 tag-selector">
                <TagSelector
                  options={techOptions}
                  field="Etiquetas"
                  filterHandler={filterHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="pais" className="form-label">País</label>
                <select
                  required
                  name="pais"
                  as="select"
                  className="form-select form-select-lg mb-3"
                  onBlur={filterHandler}
                >
                  {countriesDataSet.map((count) => {
                    return <option key={count} value={count}>{count}</option>;
                  })}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="ciudad"
                  placeholder="Ciudad"
                  name="ciudad"
                  onClick={filterHandler}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="remoto">Presencial/ a distancia</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={filters.remoto === false}
                    value={false}
                    name="remoto"
                    onClick={filterHandler}
                  />
                  <label className="form-check-label" htmlFor="remoto">
                    Presencial
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={filters.remoto === true}
                    value
                    name="remoto"
                    onClick={filterHandler}
                  />
                  <label className="form-check-label" htmlFor="remoto">
                    En remoto
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="traslado">Posibilidad traslado</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={filters.traslado === true}
                    value
                    name="traslado"
                    onClick={filterHandler}
                  />
                  <label className="form-check-label " htmlFor="traslado">
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    defaultChecked={filters.traslado === false}
                    value={false}
                    name="traslado"
                    onClick={filterHandler}
                  />
                  <label className="form-check-label" htmlFor="traslado">
                    No
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="estado">Estado</label>
                {estados.map((es) => {
                  return (
                    <div className="form-check" key={es}>
                      <input
                        className="form-check-input"
                        type="radio"
                        defaultChecked={filters.estado === es}
                        value={es}
                        name="estado"
                        onClick={filterHandler}
                      />
                      <label className="form-check-label " htmlFor="traslado">
                        {es}
                      </label>
                    </div>
                  );
                })}
              </div>
            </form>
          </>
        ) : (
          <div className="spinner-container">
            <Spinner />
          </div>
        )
      }
      </div>
    </div>
  );
};

export default CandidatosFilter;
