import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BiCloudUpload } from 'react-icons/bi';
import { IoTrashOutline } from 'react-icons/io5';
import Spinner from '../spinner/Spinner';
import countriesDataSet from '../../data/paises';
import statusDataSet from '../../data/estados';
import Button from '../button/Button';

const CandidatoInfoForm = () => {
  const countries = countriesDataSet;
  const status = statusDataSet;
  const candidatoDetail = useSelector((state) => state.candidatos);
  const [candidatoData, setCandidatoData] = useState(false);

  // Dispathc getCandidatoById
  useEffect(() => {
    if (candidatoDetail.detail) {
      setCandidatoData(candidatoDetail.detail[0]);
    } else {
      setCandidatoData(false);
    }
  }, [candidatoDetail]);
  return (
    <div className="candidato-form">
      {
        candidatoData ? (
          <form className="row">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label">Nombre y Apellidos</label>
              <input type="text" className="form-control" id="nombre" name="nombre" placeholder="Nombre alumno" defaultValue={candidatoData.nombreCompleto} />
            </div>
            <div className="col-6">
              <label htmlFor="telefono" className="form-label ">Nº Teléfono</label>
              <input type="tel" className="form-control num" id="telefono" placeholder="+34 654 85 52 48" name="telefono" defaultValue={candidatoData.telefono} />
            </div>
            <div className="col-6">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" placeholder="hcliment@gmail.com" name="email" defaultValue={candidatoData.email} />
            </div>
            <div className="col-6">
              <label htmlFor="pais" className="form-label">País</label>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg pais" name="pais" defaultValue={candidatoData.pais}>
                {countries.map((count) => {
                  return <option key={count} value={count}>{count}</option>;
                })}
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="ciudad" className="form-label">Ciudad</label>
              <input type="text" className="form-control" id="nombre" placeholder="Nombre Alumno" name="nombre" defaultValue={candidatoData.ciudad} />
            </div>
            <div className="col-6">
              <label htmlFor="presencialidad" className="form-label">Presencialidad</label>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg presencialidad" name="remoto" defaultValue={candidatoData.remoto}>
                <option value>En remoto</option>
                <option value={false}>Presencial</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="traslado" className="form-label">Traslado</label>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg traslado" name="disponibilidadTraslado" defaultValue={candidatoData.disponibilidadTraslado}>
                <option value={false}>No</option>
                <option value>Si</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="linkedin" className="form-label">Enlace Linkedin</label>
              <input type="text" className="form-control" id="linkedin" placeholder="Enlace a LinkedIn" name="linkedin" defaultValue={candidatoData.enlaceLinkedin} />
            </div>
            <div className="col-6">
              <label htmlFor="estado-laboral" className="form-label">Estado laboral</label>
              <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg traslado" name="estado-laboral" defaultValue={candidatoData.estado}>
                {status.map((item) => {
                  return <option key={item} value={item}>{item}</option>;
                })}
              </select>
            </div>
            <div className="col-12 mb-4">
              <label htmlFor="cv-upload" className="form-label">Documento CV</label>
              <div>
                <div className="file-upload">
                  <Button
                    label="Subir documento PDF"
                    color="secondary"
                  >
                    <BiCloudUpload />
                  </Button>
                  <input type="file" id="cv-upload" />
                </div>
                <Button
                  label="Borrar"
                  variant="outline"
                  color="light"
                >
                  <IoTrashOutline />
                </Button>
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
