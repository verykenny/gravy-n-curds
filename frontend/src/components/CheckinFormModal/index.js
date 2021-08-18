import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CheckinForm from './CheckinForm';

function CheckinFormModal({ poutine }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='btn btn-alt' onClick={() => setShowModal(true)}>Check-in</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CheckinForm setShowModal={setShowModal} poutine={poutine}/>
                </Modal>
            )}
        </>
    );
}

export default CheckinFormModal;
