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


interface UserInfo {
    email: string,
    password: string
}


interface AuthState {
    isUserAuth: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any,
    sessionID: string | null,
}


interface AuthResponse {
    id: number,
    name: string,
    email: string,
    password?: string,
    otp?: string,
    otpExpiresAt?: string,
    createdAt?: string,
    updatedAt?: string
}


export type { ModalProps, TransactionsDataset, Transaction, Credentials, UserInfo, AuthState, AuthResponse };