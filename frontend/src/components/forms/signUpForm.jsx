import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import routes from '../../utilites/routes';
import { useAuth } from '../../hooks/useAuth';
import signUpValidator from '../../utilites/signUpValidator';

export default () => {
  const [signUser, setSignUser] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: signUpValidator(),
    onSubmit: async (values) => {
      try {
        setSignUser(false);
        const response = await axios.post(routes.signUpPath(), values);
        auth.logIn(response.data);
        return navigate(routes.chatPage());
      } catch (e) {
        if (e.response.status === 409) {
          setSignUser(true);
        }
        console.log(e);
      }
      return null;
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-md-5">
      <h1 className="text-center mb-4">{t('signUp.registration')}</h1>
      <Form.Group className="form-floating">
        <Form.Control
          className="form-control mb-3 w-100 rounded border border-primary"
          name="username"
          id="username"
          required
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder={t('signUp.username')}
          autoComplete="username"
          isInvalid={signUser}
        />
        <label className="ms-2 form-label" htmlFor="username">{t('signUp.username')}</label>
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
          placeholder={t('signUp.password')}
          autoComplete="password"
          isInvalid={signUser}
        />
        <label className="ms-2 form-label" htmlFor="password">{t('signUp.password')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-floating">
        <Form.Control
          type="password"
          id="confirmPassword"
          placeholder={t('signUp.confirmPassword')}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
          required
          onChange={formik.handleChange}
          name="confirmPassword"
          value={formik.confirmPassword}
          isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
          autoComplete="password"
          className="form-control mb-3 h-2  0 w-100 rounded border border-primary"
        />
        <label className="ms-2 form-label" htmlFor="confirmPassword">{t('signUp.confirmPassword')}</label>
        <Form.Control.Feedback tooltip type="invalid">
          {formik.errors.confirmPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        type="submit"
        className="mb-3 w-100 btn-lg"
        variant="outline-primary"
      >
        {t('signUp.submit')}
      </Button>
      {signUser
        ? <h6 className="text-danger text-center" title=""><strong>{t('signUp.sameUsers')}</strong></h6>
        : <div className="p-4" />}
    </Form>
  );
};
