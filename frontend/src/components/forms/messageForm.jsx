import { useFormik } from 'formik';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../hooks/useAuth';
import messageValidator from '../../utilites/messageValidator';

export default () => {
  const currentChannelId = useSelector((state) => state.channel.currentChannelId);
  const auth = useAuth();
  const api = useApi();
  const inputRef = useRef(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: messageValidator(),
    onSubmit: async ({ message }) => {
      try {
        await api.newMessage({ name: auth.user, msg: message, currentChannelId });
        formik.values.message = '';
      } catch (err) {
        console.error(err);
      }
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, formik.values.message]);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="d-flex">
        <Form.Control
          ref={inputRef}
          type="text"
          name="message"
          required
          placeholder={t('chatPage.inputMessage')}
          aria-label={t('chatPage.label')}
          disabled={formik.isSubmitting}
          className="p-0 ps-2"
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <button className="btn border-0" type="submit" disabled={!formik.dirty || !formik.isValid}>
          <ArrowRightCircleFill size={30} />
          <span className="visually-hidden">{t('chatPage.send')}</span>
        </button>
      </Form.Group>
    </Form>
  );
};
