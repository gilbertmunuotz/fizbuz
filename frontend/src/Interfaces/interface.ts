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

export type { ModalProps, TransactionsDataset, Transaction }