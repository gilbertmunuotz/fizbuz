interface ModalProps {
    open: boolean,
    close: () => void;
}

interface TransactionsDataset {
    sampleTransactions: string[],
}

export type { ModalProps, TransactionsDataset }