import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/useApi';
import { changeCurrentChannel } from '../../slices/channelSlice';
import channelsNameValidator from '../../utilites/channelsNameValidator';

export default ({ closeModal }) => {
  const dispatch = useDispatch();
  const api = useApi();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channel.channels);
  const channelsNames = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      nameChannel: '',
    },
    validationSchema: channelsNameValidator(channelsNames),
    onSubmit: async (values) => {
      try {
        const data = await api.newChannel({ name: values.nameChannel });
        dispatch(changeCurrentChannel({
          channelId: data.id,
        }));
        closeModal();
        toast.success(t('toastify.createChannel'));
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              disabled={formik.isSubmitting}
              required
              onChange={formik.handleChange}
              name="nameChannel"
              id="nameChannel"
              value={formik.nameChannel}
              isInvalid={!!formik.errors.nameChannel}
            />
            <label className="visually-hidden" htmlFor="nameChannel">{t('modal.channelName')}</label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.nameChannel}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-3">
              <Button
                variant="secondary"
                type="button"
                onClick={closeModal}
                className="me-2"
              >
                {t('modal.close')}
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('modal.add')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </>
  );
};
