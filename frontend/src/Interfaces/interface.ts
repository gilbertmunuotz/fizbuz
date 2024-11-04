interface ModalProps {
    open: boolean,
    close: () => void;
}

interface TransactionsDataset {
    sampleTransactions: string[],
}

interface Transaction {
    name: string,
    amount: string,
    type: string
}

interface Credentials {
    name: string,
    email: string,
    password: string
}


export type { ModalProps, TransactionsDataset, Transaction, Credentials };