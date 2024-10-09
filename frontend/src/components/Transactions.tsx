import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import NewForm from './Form'; 

interface Transaction {
    id: number;
    text: string;
    color: string;
}

const withRandomColor = (WrappedComponent: React.ComponentType<{ transactions: Transaction[] }>) => {
    const generateRandomColor = (): string => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        return randomColor;
    };

    return (props: { transactions: Transaction[] }) => {
        const transactionsWithColor = React.useMemo(() =>
            props.transactions.map((transaction) => ({
                ...transaction,
                color: transaction.color || generateRandomColor(),
            })),
            [props.transactions]
        );

        return <WrappedComponent transactions={transactionsWithColor} />;
    };
};

const Transactions = ({ transactions, handleOpen, handleClose }: {
    transactions: Transaction[],
    handleOpen: () => void,
    handleClose: () => void,
}) => {
    const [modalOpen, setModalOpen] = React.useState(false);

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
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            <Card sx={{ marginBottom: 1, backgroundColor: transaction.color }}>
                                <CardContent>
                                    <div className="text-lg">{transaction.text}</div>
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
};

export default React.memo(withRandomColor(Transactions));