import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import Button from '../button/Button';

/** Slices imports */
import { login } from '../../store/slices/auth';
import { clearMessage } from '../../store/slices/message';

/** Initial values for formik */
const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    // Redirection if the user already is logged
    if (isLoggedIn) {
      return navigate('/admin');
    }
    return null;
  }, [isLoggedIn]);

  const initialValues = {
    email: '',
    password: '',
  };

  /** Yup schema config */
  const registerSchema = Yup.object().shape(
    {
      email: Yup.string()
        .email('Formato de email inválido.')
        .required('Campo obligatorio.'),
      password: Yup.string()
        .min(6, 'Contraseña muy corta. Mínimo 6 carácteres.')
        .required('Campo obligatorio.'),
    },
  );

  // Submit handle trigger for user login
  const authUser = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate('/admin');
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      // *** Yup Validation Schema ***
      validationSchema={registerSchema}
      // ** onSubmit Event
      onSubmit={(formValue) => {
        authUser(formValue);
      }}
    >
      {({
        touched,
        errors,
      }) => (
        <Form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label cm-text-700">
              Email
            </label>
            <div className="input-wrapper">
              {/* email Errors */}
              {
                errors.email && touched.email
                && (
                  <ErrorMessage name="email" component="div" className="form-error" />
                )
              }
              <Field
                type="email"
                className="form-control"
                id="email"
                placeholder="Introduce tu correo"
                name="email"
              />
            </div>

          </div>
          <div className="mb-3">
            <label htmlFor="pasword" className="form-label cm-text-700">Contraseña</label>
            <div className="input-wrapper">
              <Field
                type="password"
                className="form-control"
                id="pasword"
                placeholder="Introduce tu contraseña"
                name="password"
              />
              {/* Password Errors */}
              {
              errors.password && touched.password
              && (
                <ErrorMessage name="password" component="div" className="form-error cm-text-700" />
              )
            }
            </div>
          </div>
          <div className="mb-3 row">
            <div className="mb-3 col-6 form-check">
              <input type="checkbox" className="form-check-input" id="recuerdame" />
              <label className="form-check-label cm-text-500" htmlFor="recuerdame">Recuérdame</label>
            </div>
            <div className="col-6">
              <a href="/home." className="cm-text--green cm-text-600">He olvidado la contraseña</a>
            </div>
          </div>
          <div className="d-grid">
            {/* // TODO Spinner */}
            {loading && (

              <span className="spinner">LOADING...</span>
            )}
            {/* // TODO Error message */}
            {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
            )}
            <Button label="Iniciar Sesión" type="submit" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
