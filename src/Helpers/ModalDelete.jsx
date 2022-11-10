
import React from 'react';

const ModalDelete = ({ modalMessage, setdeleteConfirm, deleteConfirm }) => {
    return (
        <React.Fragment>
            <Modal
                show={deletePopup}
                size="md"
                popup={true}
                onClose={() => setdeleteConfirm(false)}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <BsExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="gray"
                                onClick={() => setdeleteConfirm(false)}
                            >
                                No, Cancel
                            </Button>

                            <Button
                                className='bg-red-600 text-white'
                                onClick={() => { deleteConfirm(true), deletePopup(false) }}
                            >
                                Yes, Delete Please
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>

    );
};

export default ModalDelete;