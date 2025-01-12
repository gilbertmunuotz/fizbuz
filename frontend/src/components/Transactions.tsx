import NewForm from './Form';
import { useState } from 'react';
import Card from '@mui/material/Card';
import { user } from '../assets/authSlice';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import { CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AuthResponse } from '../Interfaces/interface';
import { useGetTop3TransactionsQuery } from "../api/TransactionSlice";


export default function Transactions() {

    // Extract user information & Annotate it 
    const userInfo = useSelector(user) as AuthResponse;

    // Grab the Id from userInfo Object
    const userId = userInfo.id;

    // Manage Closing & Opening of Modal
    const [modalOpen, setModalOpen] = useState(false);


    // Modal Functions
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    // Destructure RTK Hook
    const { data: transactions } = useGetTop3TransactionsQuery(userId);
 
    return (
        <div>
            <>
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-3xl font-serif">Transactions</h1>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button className="rounded-full bg-indigo-600 px-5 py-1.5" onClick={handleOpen}>
                            <Tooltip title={'New Transaction'}>
                                <div className="flex items-center space-x-2">
                                    <AddIcon className="text-white" />
                                    <h2 className="text-base text-white">New</h2>
                                </div>
                            </Tooltip>
                        </button>
                    </div>

                    {/* Pass the modal state and the close function to NewForm */}
                    <div>
                        <NewForm open={modalOpen} close={handleClose} />
                    </div>

                    <div className="sm:ml-10">
                        <h4 className="text-2xl font-serif mt-4">History</h4>
                        {transactions?.transactions?.length ? (
                            // Render your transaction history here
                            <ul>
                                {transactions?.transactions.map((transaction) => (
                                    <div key={transaction.id} className={`border-r-4 p-4 rounded shadow-sm mb-4 ${transaction.type === 'income' ? 'border-blue-500' : 'border-yellow-500'}`}>
                                        <Card sx={{ my: 0, gap: 2, cursor: 'pointer' }}>
                                            <CardContent
                                                sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                <h3 className="font-semibold">{transaction.name}</h3>
                                                <h4 className="font-semibold">${transaction.amount}</h4>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <h6 className='text-lg'>No History found! 🙃</h6>
                        )}
                    </div>
                </div>
            </>
        </div >
    )
}