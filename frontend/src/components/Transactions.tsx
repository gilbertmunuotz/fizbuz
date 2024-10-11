import NewForm from './Form';
import { useState } from 'react';
import Card from '@mui/material/Card';
import Tooltip from '@mui/material/Tooltip';
import { CardContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { TransactionsDataset } from '../Interfaces/interface';

export default function Transactions() {

    // Manage Closing & Opening of Modal
    const [modalOpen, setModalOpen] = useState(false);

    // Modal Functions
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    // Sample Datasets
    const sampleTransactions: TransactionsDataset = {
        sampleTransactions: [
            "Rent Payment",
            "Grocery Shopping",
            "Public Transport Fare"
        ]
    };

    return (
        <div>
            <>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-serif">Transactions</h1>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button className="rounded-full bg-slate-600 px-5 py-1.5" onClick={handleOpen}>
                            <Tooltip title={'New Transaction'}>
                                <h2 className="text-base text-white">New</h2>
                            </Tooltip>
                        </button>
                    </div>

                    {/* Pass the modal state and the close function to NewForm */}
                    <div>
                        <NewForm open={modalOpen} close={handleClose} />
                    </div>

                    <div className=" sm:ml-10">
                        <h4 className="text-2xl font-serif mt-4">History</h4>
                        {/* Render your transaction history here */}
                        <ul>
                            {sampleTransactions.sampleTransactions.map((transaction: string, index: number) => (
                                <li key={index}>
                                    <Card sx={{ marginBottom: 1, my: 1 }}>
                                        <CardContent>
                                            <div className="text-lg">
                                                {index + 1}. {transaction}
                                            </div>
                                            <div className="flex justify-end">
                                                <Tooltip title={"Edit"}>
                                                    <EditIcon sx={{ color: 'green' }} />
                                                </Tooltip>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        </div>
    )
}