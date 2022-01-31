/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
/* import PropTypes from 'prop-types'; */
import { useDispatch, useSelector } from 'react-redux';
import '../layout/Admin/Candidatos/candidatos.scss';
import { BiCloudUpload } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import countriesDataSet from '../../data/paises';
import { createCandidato } from '../../store/slices/candidatos/index';
import { getAllTecnologias } from '../../store/slices/tecnologias';
import Spinner from '../spinner/Spinner';
import Button from '../button/Button';
import TagSelector from '../tags/TagSelector';
/* import TagSelector from '../tags/TagSelector'; */

const CandidatoCreateForm = ({ changeState }) => {
  const tecnologiasState = useSelector((reduxState) => reduxState.tecnologias);
  let techOptions = false;
  if (tecnologiasState.list) {
    techOptions = tecnologiasState.list;
  }

  const [selectedTecnologias, setSelectedTecnologias] = useState({});
  const [loading, setLoading] = useState(false);
  const countries = countriesDataSet;

  const navigate = useNavigate();
  // const availableCountries = countriesDataSet.filter((item) => item !== 'Seleccione un país');
  const dispatch = useDispatch();
  // Dispathc getAllTec
  useEffect(() => {
    dispatch(getAllTecnologias());
  }, [dispatch]);

  const [formValues, setFormValues] = useState({
    nombreCompleto: '',
    pais: '',
    ciudad: '',
    telefono: '',
    email: '',
    remoto: '',
    disponibilidadTraslado: '',
    enlaceLinkedin: '',
  });

  // Handling files
  const inputAvatarRef = useRef();

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedTecnologias);
    const data = {
      ...formValues,
      /* avatar: inputAvatarRef.current.files[0], */
      tecnologias: selectedTecnologias,
    };
    console.log(data);
    dispatch(createCandidato(data))
      .unwrap()
      .then(() => {
        navigate('/admin');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="candidato-form">
      {
      techOptions ? (
        <form onSubmit={handleSubmit}>
          <div className="row form-content">
            <div className="col-6 row">
              <div className="col-12">
                <label htmlFor="nombreCompleto" className="form-label">
                  Nombre y Apellidos
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="nombreCompleto"
                  placeholder="Nombre Alumno"
                  name="nombreCompleto"
                  value={formValues.nombreCompleto}
                  onChange={handlerChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="pais" className="form-label">País</label>
                <select
                  required
                  name="pais"
                  as="select"
                  className="form-select form-select-lg mb-3"
                  onChange={handlerChange}
                >
                  {countries.map((count) => {
                    return <option key={count} value={count}>{count}</option>;
                  })}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="ciudad"
                  placeholder="Ciudad"
                  name="ciudad"
                  onChange={handlerChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="telefono" className="form-label ">Nº Teléfono</label>
                <input
                  required
                  type="tel"
                  className="form-control num"
                  id="telefono"
                  placeholder="Ej: 654 85 52 48"
                  name="telefono"
                  onChange={handlerChange}
                />
              </div>
              <div className="col-6">

                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  id="email"
                  placeholder="hcliment@gmail.com"
                  name="email"
                  onChange={handlerChange}
                />
              </div>
              <div className="col-6">
                <label htmlFor="remoto" className="form-label">Presencialidad</label>
                <select
                  name="remoto"
                  as="select"
                  className="form-select form-select-lg mb-3"
                  onChange={handlerChange}
                >
                  <option value="none">Elige una opción</option>
                  <option value>Remoto</option>
                  <option value={false}>Presencial</option>
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="disponibilidadTraslado" className="form-label">Traslado</label>
                <select
                  name="disponibilidadTraslado"
                  as="select"
                  className="form-select form-select-lg mb-3"
                  onChange={handlerChange}
                >
                  <option value="none">Elige una opción</option>
                  <option value>Si</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="enlaceLinkedin" className="form-label">Perfil Linkedin</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enlace a LinkedIn"
                  name="enlaceLinkedin"
                  onChange={handlerChange}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-4 file-input">
                <label htmlFor="avatar" className="form-label">Foto de perfil</label>
                <div className="row">
                  <div className="col-auto pe-0 file-btn">
                    <input
                      type="file"
                      ref={inputAvatarRef}
                      name="avatar"
                      id="avatar"
                    />
                    <Button
                      label="Subir imágen"
                      color="secondary"
                    >
                      <BiCloudUpload />
                    </Button>
                  </div>
                  <div className="col-auto p-0">
                    <p>
                      Archivos soportados:
                      {' '}
                      <span>.png, .jpg, y .jpeg</span>
                    </p>
                    <p>
                      Tamaño de archivo máximo:
                      {' '}
                      <span>2 MB</span>
                      {' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 file-input">
                <label htmlFor="avatar" className="form-label">Documento CV</label>
                <div className="row">
                  <div className="col-auto pe-0 file-btn">
                    <input
                      type="file"
                      ref={inputAvatarRef}
                      name="cv"
                      id="cv"
                    />
                    <Button
                      label="Subir imágen"
                      color="secondary"
                    >
                      <BiCloudUpload />
                    </Button>
                  </div>
                  <div className="col-auto p-0">
                    <p>
                      Archivos soportados:
                      {' '}
                      <span>.df</span>
                    </p>
                    <p>
                      Tamaño de archivo máximo:
                      {' '}
                      <span>20 MB</span>
                      {' '}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-3 tag-selector">
                <TagSelector
                  options={techOptions}
                  field="Etiquetas"
                  setSelectedTecnologias={setSelectedTecnologias}
                />
              </div>
            </div>
          </div>
          {
            loading && <h2>Creacion en progreso..</h2>
          }
          <div className="modal-footer">
            <Button label="Guardar" color="light" type="submit" />
            <Button label="Cancelar" color="secondary" onClick={() => changeState(false)} />
          </div>
        </form>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )
    }
    </div>
  );
};

CandidatoCreateForm.propTypes = {
  changeState: PropTypes.func.isRequired,
};

export default CandidatoCreateForm;
