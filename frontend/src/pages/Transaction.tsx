import { toast } from 'react-toastify';
import TopNav from "../components/TopNav";
import { useSelector } from 'react-redux';
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
    const [deleteTransaction] = useDeleteTransactionMutation();


    // Delete Transaction Logic
    async function handleDelete(id: number) {
        try {
            await deleteTransaction(id).unwrap();
            toast.success("Transaction deleted successfully");
        } catch (error) {
            console.error('Failed to delete Transaction: ', error);
            toast.error("Error Deleting Transaction");
        }
    }

    return (
        <>
            <TopNav />
            {/* Add responsive padding to the main content to offset the DrawerNav on larger screens */}
            <div className="lg:ml-64 mx-6 my-4">
                <h1 className="ml-8 font-serif text-2xl mb-3">My Transactions</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ml-4">
                    {transactions ? (
                        transactions?.transactions.map((transaction) => (
                            <div key={transaction.id} className={` border-l-2 p-3 rounded shadow-sm flex items-center justify-between ${transaction.type === 'income' ? 'border-blue-500' : 'border-yellow-500'}`}>
                                <div>
                                    <h2 className="text-lg font-semibold">{transaction.name}</h2>
                                    <p className="text-gray-700">
                                        Amount: <span className="font-bold">${transaction.amount}</span>
                                    </p>

                                    <p className={`text-sm font-medium mt-2 ${transaction.type === 'income' ? 'text-blue-500' : 'text-yellow-500'}`}>
                                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                    </p>
                                </div>

                                <button onClick={() => handleDelete(transaction.id!)}> <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} /></button>
                            </div>
                        ))
                    ) : (
                        <h5 className='text-lg sm:ml-5'>No Transaction Found! 🙃</h5>
                    )}
                </div>
            </div>
        </>
    )
}