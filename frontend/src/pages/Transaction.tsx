import { useEffect } from 'react';
import TopNav from "../components/TopNav";
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { user } from '../assets/authSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthResponse } from '../Interfaces/interface';
import { useGetTransactionQuery, useDeleteTransactionMutation } from "../api/TransactionSlice";


export default function Transaction() {

    // Extract user information & Annotate it 
    const userInfo = useSelector(user) as AuthResponse;

    // Grab the Id from userInfo Object
    const userId = userInfo.id;

    // Get Transaction Data from RTK Query
    const { data: transactions } = useGetTransactionQuery(userId);

    // Delete Transaction using RTK Query
    const [] = useDeleteTransactionMutation();

    // Update Fetched Data on Page Load
    useEffect(() => {
        if (transactions) {
            console.log('Fetched Transactions:', transactions);
        }
    }, [transactions]);

    // Delete Transaction Logic
    async function handleDelete() {
        event.preventDefault()

        window.alert("Button Clicked")
    }

    return (
        <>
            <TopNav />
            {/* Add responsive padding to the main content to offset the DrawerNav on larger screens */}
            <div className="lg:ml-64 mx-6 my-4">
                <h1 className="ml-8 font-serif text-2xl mb-3">My Transactions</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
                    {/* Transactions */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {transactions?.transactions.map((transaction) => (
                            <div key={transaction.id} className={`border-l-4 p-3 rounded shadow-sm flex items-center justify-between ${transaction.type === 'income' ? 'border-blue-500' : 'border-yellow-500'}`}>
                                <div>
                                    <h2 className="text-lg font-semibold">{transaction.name}</h2>
                                    <p className="text-gray-700">
                                        Amount: <span className="font-bold">${transaction.amount}</span>
                                    </p>
                                </div>

                                <Button onClick={handleDelete}><DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} /></Button>
                            </div>
                        ))}
                    </div>

                    {/* Scale */}
                    <div className="grid place-items-center h-screen">
                        <div className="lg:block border-4 border-gray-300 p-4 rounded shadow-sm">
                            <h3 className="text-lg font-semibold text-center">Scale</h3>
                            <div className="flex items-center space-x-2 mt-4">
                                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                <p className="text-gray-700 text-sm">Income</p>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                                <p className="text-gray-700 text-sm">Expense</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}