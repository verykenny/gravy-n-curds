import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheckinForm from './CheckinForm';

function CheckinFormModal({ poutineId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='btn btn-alt' onClick={() => setShowModal(true)}>Check-in</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CheckinForm setShowModal={setShowModal} poutineId={poutineId}/>
                </Modal>
            )}
        </>
    );
}

export default CheckinFormModal;
