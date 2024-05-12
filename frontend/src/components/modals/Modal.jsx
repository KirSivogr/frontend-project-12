import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import addChannelModal from './addChannelModal';
import renameChannelModal from './renameChannelModal';
import removeChannelModal from './removeChannelModal';
import { closeWindow } from '../../slices/modalSlice';

const MyModal = () => {
  const mapping = {
    addChannelModal,
    renameChannelModal,
    removeChannelModal,
  };
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeWindow());
  };
  const isOpened = useSelector((state) => state.modal.isOpen);
  const type = useSelector((state) => state.modal.typeOfForm);

  const SelectModal = mapping[type];

  return (
    <Modal show={isOpened} onHide={closeModal} centered>
      { SelectModal ? <SelectModal closeModal={closeModal} /> : null }
    </Modal>
  );
};

export default MyModal;
