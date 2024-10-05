import NewForm from "./Form";
import { useState } from 'react';

export default function Transactions() {

    // Manage Closing & Opening of Modal
    const [modalOpen, setModalOpen] = useState(false);

    // Modals Functions
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-serif">Transactions</h1>
            </div>


            <div className="flex justify-end">
                <button className="rounded-full bg-slate-600 px-5 py-1.5" onClick={handleOpen} >
                    <h2 className="text text-base text-white">New</h2>
                </button>
            </div>

            <div>
                <NewForm open={modalOpen} close={handleClose} />
            </div>

        </>
    )
}