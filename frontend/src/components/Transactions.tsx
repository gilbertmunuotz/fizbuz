import NewForm from "./Form";
import { useState } from 'react';
import Card from '@mui/material/Card';
import EditIcon from '@mui/icons-material/Edit';
import { CardContent, Tooltip } from "@mui/material";
import { TransactionsDataset } from "../Interfaces/interface";

export default function Transactions() {
    // Manage Closing & Opening of Modal
    const [modalOpen, setModalOpen] = useState(false);

    // Modal Functions
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const sampleTransactions: TransactionsDataset = {
        sampleTransactions: [
            "Rent Payment",
            "Grocery Shopping",
            "Public Transport Fare"
        ]
    };

    return (
        <>
            <div className="flex justify-center">
                <h1 className="text-3xl font-serif">Transactions</h1>
            </div>

            <div className="flex justify-end">
                <button className="rounded-full bg-slate-600 px-5 py-1.5" onClick={handleOpen}>
                    <Tooltip title={'New Transaction'}>
                        <h2 className="text text-base text-white">New</h2>
                    </Tooltip>
                </button>
            </div>

            <div>
                <NewForm open={modalOpen} close={handleClose} />
            </div>

            <div className="ml-10">
                <h4 className="text-2xl font-serif mt-4">History</h4>
                <ul>
                    {sampleTransactions.sampleTransactions.map((transaction: string, index: number) => (
                        <li key={index}>
                            <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                                <CardContent>
                                    <div className="text-lg">
                                        {index + 1}. {transaction}
                                    </div>
                                    <div className="flex justify-end">
                                        <Tooltip title={"Edit"}>
                                            <EditIcon sx={{ color: 'forestgreen' }} />
                                        </Tooltip>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}