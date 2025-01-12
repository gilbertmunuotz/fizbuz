interface ModalProps {
    open: boolean,
    close: () => void;
}


interface Transaction {
    id?: number,
    userId: number,
    name: string,
    amount: string,
    type: string,
    createdAt?: string,
    updatedAt?: string
}


interface TransactionResponse {
    status: string,
    transactions: Transaction[]
}


interface Credentials {
    name: string,
    email: string,
    password: string
}


interface UserInfo {
    id: number,
    name?: string,
    email: string,
    password: string
}


interface LoginUserInfo {
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


interface UserResponse {
    user: {
        id: number,
        name: string,
        email: string,
        password?: string,
        otp?: string,
        otpExpiresAt?: string
    }
}


interface SessionInfo {
    status: string,
    user: Array<{
        id: number,
        name: string,
        email: string,
        password: string,
        otp: number,
        otpExpiresAt: string,
        ipAddress: string,
        userAgent: string,
        createdAt?: string,
        updatedAt?: string
    }>,
    sessionID: string
}


export type { ModalProps, Transaction, Credentials, UserInfo, LoginUserInfo, AuthState, AuthResponse, TransactionResponse, UserResponse, SessionInfo };