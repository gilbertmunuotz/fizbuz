import { useEffect } from 'react';
import TopNav from "../components/TopNav";
import { useSelector } from 'react-redux';
import { user } from '../assets/authSlice';
import { AuthResponse } from '../Interfaces/interface';
import { useGetTransactionQuery } from "../api/TransactionSlice";


export default function Transaction() {

    // Extract user information & Annotate it 
    const userInfo = useSelector(user) as AuthResponse;

    // Grab the Id from userInfo Object
    const userId = userInfo.id;

    // Get the full data object from RTK Query
    const { data: transactions } = useGetTransactionQuery(userId);


    useEffect(() => {
        if (transactions) {
            console.log('Fetched Transactions:', transactions);
        }
    }, [transactions]);


    return (
        <>
            <TopNav />
            {/* Add responsive padding to the main content to offset the DrawerNav on larger screens */}
            <div className="lg:ml-64 mx-6 my-4">
                <h1 className="ml-8 font-serif text-2xl">My Transactions</h1>

            </div>
        </>
    )
}