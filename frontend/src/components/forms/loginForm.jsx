import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../utilites/routes';
import loginValidator from '../../utilites/loginValidator';
import { useAuth } from '../../hooks/useAuth';

export default () => {
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginValidator(),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('token', JSON.stringify(res.data));
        auth.logIn(res.data);
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        setAuthFailed(true);
        if (err.isAxiosError && err.response.status === 401) {
          inputRef.current.select();
        } else throw err;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-md-5">
      <h1 className="text-center mb-4">{t('login.header')}</h1>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 w-100 rounded border border-primary"
          name="username"
          id="username"
          required
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('login.username')}
          autoComplete="username"
          isInvalid={authFailed}
        />
        <label className="ms-2 form-label" htmlFor="username">{t('login.username')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 h-2  0 w-100 rounded border border-primary"
          name="password"
          id="password"
          required
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder={t('login.password')}
          autoComplete="password"
          isInvalid={authFailed}
        />
        <label className="ms-2 form-label" htmlFor="password">{t('login.password')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        className="mb-3 w-100 btn-lg"
        variant="outline-primary"
      >
        {t('login.submit')}
      </Button>
      {authFailed
        ? <h6 className="text-danger text-center" title=""><strong>{t('login.authFailed')}</strong></h6>
        : <div className="p-4" />}
    </Form>
  );
};
