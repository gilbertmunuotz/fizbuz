/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar } from 'recharts'
import { useGetTop3TransactionsQuery } from "../api/TransactionSlice";
import { user } from '../assets/authSlice';
import { useSelector } from 'react-redux';
import { Transaction } from "../Interfaces/interface";
import { AuthResponse } from '../Interfaces/interface';

export default function Chart() {

    // Define the type for Custom Shape Props
    interface CustomShapeProps {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        payload: {
            color: string;
        };
    }


    // Extract user information & Annotate it 
    const userInfo = useSelector(user) as AuthResponse;

    // Grab the Id from userInfo Object
    const userId = userInfo.id;

    // Destructure RTK Hook
    const { data: transactions } = useGetTop3TransactionsQuery(userId);

    // Ensure data exists before rendering
    const chartData = transactions?.transactions.map((transaction: Transaction) => ({
        name: transaction.name,
        amount: transaction.amount,
        color: transaction.type === "income" ? "#4f46e5" : "#fbbf24",
    }))

    // Custom Shape Function
    const CustomBarShape: React.FC<CustomShapeProps> = ({ x, y, width, height, payload }) => {
        return (
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={payload.color} // Dynamic color from payload
            />
        );
    };

    if (!transactions) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <>
                <div className="mt-6 bg-white shadow-lg rounded p-6">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                                dataKey="amount"
                                barSize={50}
                                shape={(props:any ) => <CustomBarShape {...props} />}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </>
        </div>
    )
}