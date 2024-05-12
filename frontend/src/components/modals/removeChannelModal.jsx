import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useApi } from '../../hooks/useApi';

export default ({ closeModal }) => {
  const api = useApi();
  const { t } = useTranslation();
  const currentChannelId = useSelector((state) => state.channel.currentChannelId);

  const removeChannel = async () => {
    try {
      await api.removeChannel({ id: currentChannelId });
      closeModal();
      toast.success(t('toastify.deleteChannel'));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t('modal.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modal.removeQuestion')}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          type="button"
          onClick={closeModal}
          className="me-2"
        >
          {t('modal.close')}
        </Button>
        <Button
          variant="danger"
          type="button"
          onClick={removeChannel}
        >
          {t('modal.remove')}
        </Button>
      </Modal.Footer>
    </>
  );
};
