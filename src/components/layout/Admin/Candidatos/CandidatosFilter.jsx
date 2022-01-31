import React, { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import { CgClose } from 'react-icons/cg';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import tecnologias from '../../../../data/tecnologias.json';
import estados from '../../../../data/estados';
import countriesDataSet from '../../../../data/paises';
import Spinner from '../../../spinner/Spinner';
import { getAllCandidatos } from '../../../../store/slices/candidatos';

const AdminSidebar = () => {
  const techOptions = useSelector((reduxState) => reduxState.tecnologias);
  const [selectedTags, setSelectedTags] = useState(null);
  const [filters, setFilters] = useState({});
  const [queryString, setQueryString] = useState({});
  const dispatch = useDispatch();
  const handleTagsChange = (e) => {
    setSelectedTags(e);
  };
  const deleteTag = (value) => {
    const newState = selectedTags.filter((tag) => {
      return tag.id !== value;
    });
    setSelectedTags(newState);
  };
  /*   const tech = {
    tecnologias: {
      1: {
        Nivel: 1,
      },
      2: {
        Nivel: 3,
      },
    },
  }; */

  const filterHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    setQueryString(new URLSearchParams(filters).toString());
  };
  const clearFilters = () => {
    dispatch(getAllCandidatos());
  };

  if (queryString)dispatch(getAllCandidatos(queryString));

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
                <label htmlFor="tecnologias" className="form-label">Tecnologías</label>
                <Select className="form-control" placeholder="Escribe para buscar...." name="etiquetas" isMulti options={tecnologias} value={selectedTags} onChange={handleTagsChange} classNamePrefix="tag-select" />
                {
            selectedTags === null ? ''
              : (
                <div id="tag-list" className="tag-list">
                  {selectedTags.map((t) => (
                    <span key={t.id}>
                      {t.label}
                      <CgClose onClick={() => deleteTag(t.id)} />
                    </span>
                  ))}
                </div>
              )
        }
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
                  <input className="form-check-input" type="radio" value={false} name="remoto" onClick={filterHandler} />
                  <label className="form-check-label" htmlFor="remoto">
                    Presencial
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" value name="remoto" onClick={filterHandler} />
                  <label className="form-check-label" htmlFor="remoto">
                    En remoto
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="disponibilidadTraslado">Posibilidad traslado</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value
                    name="disponibilidadTraslado"
                    onClick={filterHandler}
                  />
                  <label className="form-check-label " htmlFor="disponibilidadTraslado">
                    Si
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    value={false}
                    name="disponibilidadTraslado"
                    onClick={filterHandler}
                  />
                  <label className="form-check-label" htmlFor="disponibilidadTraslado">
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

export default AdminSidebar;
