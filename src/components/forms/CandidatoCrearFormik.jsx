import React, { useEffect/* , useState  */ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import '../layout/Admin/Candidatos/candidatos.scss';
import countriesDataSet from '../../data/paises';
// import { createCandidato } from '../../store/slices/candidatos/index';
import { getAllTecnologias } from '../../store/slices/tecnologias';
import Spinner from '../spinner/Spinner';

const CandidatoCreateForm = () => {
  const tecnologiasState = useSelector((reduxState) => reduxState.tecnologias);
  let techOptions = false;
  if (tecnologiasState.list) {
    techOptions = tecnologiasState.list;
  }
  const countries = countriesDataSet;
  const availableCountries = countriesDataSet.filter((item) => item !== 'Seleccione un país');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTecnologias());
  }, [dispatch]);
  const handlerFormik = (values, { setSubmitting }) => {
    console.log(values);
    console.log(setSubmitting);
  };

  return (
    <div className="candidato-form">
      {
      techOptions ? (
        <Formik
          initialValues={{
            nombreCompleto: '',
            pais: '',
            ciudad: '',
            telefono: '',
            email: '',
            remoto: '',
            disponibilidadTraslado: '',
            enlaceLinkedin: '', /*
            avatar, */
          }}
          validationSchema={Yup.object({
            nombreCompleto: Yup.string()
              .min(3, 'El campo debe tener como mínimo 3 carácteres.')
              .required('Campo obligatorio.'),
            pais: Yup.string()
              .oneOf(availableCountries, 'Seleccione un país de la lista')
              .required('Seleccione un país'),
            ciudad: Yup.string()
              .min(3, 'El campo debe tener como mínimo 3 carácteres.')
              .required('Campo obligatorio.'),
            telefono: Yup.string()
              .max(15, 'El teléfono ha de tener 9 dígitos.')
              .matches(/^[6]{1}[0-9]{8}$/, 'El teléfono ha de tener 9 digitos sin espacios ni guiones. Ej: 603245333')
              .required('Campo obligatorio.'),
            email: Yup.string()
              .email('Formato de email inválido.')
              .required('Campo obligatorio.'),
            remoto: Yup.string()
              .oneOf(['1', '0'], 'Seleccione una opción')
              .required('Campo obligatorio.'),
            disponibilidadTraslado: Yup.string()
              .oneOf(['1', '0'], 'Seleccione una opción')
              .required('Campo obligatorio.'),
          })}
          onSubmit={handlerFormik}
        >
          <Form className="row" id="create-candidate-form">
            <div className="col-6 row">
              <div className="col-12">
                <label htmlFor="nombreCompleto" className="form-label">Nombre y Apellidos</label>
                <Field type="text" className="form-control" id="nombreCompleto" placeholder="Nombre Alumno" name="nombreCompleto" />
                <ErrorMessage name="nombreCompleto" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-6">
                <label htmlFor="pais" className="form-label">País</label>
                <Field name="pais" as="select" className="form-select form-select-lg mb-3">
                  {countries.map((count) => {
                    return <option key={count} value={count}>{count}</option>;
                  })}
                </Field>
                <ErrorMessage name="pais" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-6">
                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                <Field type="text" className="form-control" id="ciudad" placeholder="Nombre Alumno" name="ciudad" />
                <ErrorMessage name="ciudad" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-6">
                <label htmlFor="telefono" className="form-label ">Nº Teléfono</label>
                <Field type="tel" className="form-control num" id="telefono" placeholder="Ej: 654 85 52 48" name="telefono" />
                <ErrorMessage name="telefono" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-6">
                <label htmlFor="email" className="form-label">Email</label>
                <Field type="email" className="form-control" id="email" placeholder="hcliment@gmail.com" name="email" />
                <ErrorMessage name="email" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-6">
                <label htmlFor="remoto" className="form-label">Presencialidad</label>
                <Field name="remoto" as="select" className="form-select form-select-lg mb-3">
                  <option value="none">Elige una opción</option>
                  <option value="1">Remoto</option>
                  <option value="0">Presencial</option>
                </Field>
                <ErrorMessage name="remoto" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-6">
                <label htmlFor="disponibilidadTraslado" className="form-label">Traslado</label>
                <Field name="disponibilidadTraslado" as="select" className="form-select form-select-lg mb-3">
                  <option value="none">Elige una opción</option>
                  <option value="1">Si</option>
                  <option value="0">No</option>
                </Field>
                <ErrorMessage name="disponibilidadTraslado" component="div" className="form-error cm-text-700" />
              </div>
              <div className="col-12">
                <label htmlFor="enlaceLinkedin" className="form-label">Perfil Linkedin</label>
                <Field type="text" className="form-control" placeholder="Enlace a LinkedIn" name="enlaceLinkedin" />
              </div>
            </div>
            {/* <div className="col-6">
              <div className="mb-4 file-input">
                <label htmlFor="avatar" className="form-label">Foto de perfil</label>
                <div className="row">
                  <div className="col-auto pe-0 file-btn">
                    <Field
                      type="file"
                      name="avatar"
                      id="avatar"
                      onChange={(event) => {
                        handleFileChange(event);
                      }}
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
            </div> */}
          </Form>
        </Formik>
      ) : (
        <div className="spinner-container">
          <Spinner />
        </div>
      )
    }
    </div>
  );
};

/* CandidatoCreateForm.propTypes = {
  submitHandeler: PropTypes.func.isRequired,
};
 */
export default CandidatoCreateForm;
