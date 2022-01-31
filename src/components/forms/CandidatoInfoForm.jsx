import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCloudUpload } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import Spinner from '../spinner/Spinner';
import countriesDataSet from '../../data/paises';
import statusDataSet from '../../data/estados';
import Button from '../button/Button';
import { updateCandidato } from '../../store/slices/candidatos';

const CandidatoInfoForm = () => {
  const countries = countriesDataSet;
  const status = statusDataSet;
  const candidatoDetail = useSelector((state) => state.candidatos);
  const [candidatoData, setCandidatoData] = useState(false);
  // Handling files
  const inputCvRef = useRef();
  const dispatch = useDispatch();
  // Dispathc getCandidatoById
  useEffect(() => {
    if (candidatoDetail.detail) {
      setCandidatoData(candidatoDetail.detail[0]);
    } else {
      setCandidatoData(false);
    }
  }, [candidatoDetail]);

  // Handler onchange and trigger update field request
  const handlerChange = (e) => {
    const { name, value } = e.target;
    if (value !== 'null') {
      const field = {
        [name]: value,
      };
      const data = {
        id: candidatoData.id,
        field,
      };
      dispatch(updateCandidato(data));
    }
  };

  // File upload handler
  const handlerFileChange = () => {
    const field = {
      cv: inputCvRef.current.files[0],
    };

    const data = {
      id: candidatoData.id,
      field,
    };
    dispatch(updateCandidato(data));
  };

  return (
    <div className="candidato-form">
      {
        candidatoData ? (
          <form className="row">
            <div className="col-12">
              <label htmlFor="nombreCompleto" className="form-label">Nombre y Apellidos</label>
              <input
                type="text"
                className="form-control"
                id="nombreCompleto"
                name="nombreCompleto"
                placeholder="Nombre alumno"
                defaultValue={candidatoData.nombreCompleto}
                onBlur={handlerChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="telefono" className="form-label ">Nº Teléfono</label>
              <input
                type="tel"
                className="form-control num"
                id="telefono"
                placeholder="+34 654 85 52 48"
                name="telefono"
                defaultValue={candidatoData.telefono}
                onBlur={handlerChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="hcliment@gmail.com"
                name="email"
                defaultValue={candidatoData.email}
                onBlur={handlerChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="pais" className="form-label">País</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg pais"
                name="pais"
                defaultValue={candidatoData.pais}
                onBlur={handlerChange}
              >
                {countries.map((count) => {
                  return <option key={count} value={count}>{count}</option>;
                })}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="ciudad" className="form-label">Ciudad</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Nombre Alumno"
                name="ciudad"
                defaultValue={candidatoData.ciudad}
                onBlur={handlerChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="presencialidad" className="form-label">Presencialidad</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg presencialidad"
                name="remoto"
                defaultValue={candidatoData.remoto}
                onBlur={handlerChange}
              >
                <option value="null">Elige una opción</option>
                <option value>Remoto</option>
                <option value={false}>Presencial</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="traslado" className="form-label">Traslado</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg traslado"
                name="disponibilidadTraslado"
                defaultValue={candidatoData.disponibilidadTraslado}
                onBlur={handlerChange}
              >
                <option value="null">Elige una opción</option>
                <option value>Si</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="linkedin" className="form-label">Enlace Linkedin</label>
              <input
                type="text"
                className="form-control"
                id="linkedin"
                placeholder="Enlace a LinkedIn"
                name="enlaceLinkedin"
                defaultValue={candidatoData.enlaceLinkedin}
                onBlur={handlerChange}
              />
            </div>
            <div className="col-6">
              <label htmlFor="estado-laboral" className="form-label">Estado laboral</label>
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg traslado"
                name="estado"
                defaultValue={candidatoData.estado}
                onBlur={handlerChange}
              >
                {status.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className=" col-12mb-4 file-input">
              <label htmlFor="avatar" className="form-label">Documento CV</label>
              <div className="row">
                <div className="col-auto pe-0 file-btn">
                  <input
                    type="file"
                    ref={inputCvRef}
                    name="cv"
                    id="cv"
                    onChange={handlerFileChange}
                  />
                  <Button
                    label="Subir de nuevo"
                    color="secondary"
                  >
                    <BiCloudUpload />
                  </Button>
                </div>
                <div className="col-auto p-0">
                  <Button
                    label="Borrar"
                    variant="outline"
                    color="light"
                  >
                    <IoTrashOutline />
                  </Button>
                </div>
              </div>
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

export default CandidatoInfoForm;
