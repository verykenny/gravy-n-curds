import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheckinForm from './CheckinForm';

function CheckinFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='btn btn-primary' onClick={() => setShowModal(true)}>Check-in</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CheckinForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CheckinFormModal;
