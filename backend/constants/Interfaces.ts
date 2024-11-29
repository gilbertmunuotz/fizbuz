// Define Interfaces Here

export interface User {
    name?: string,
    email: string,
    password: string,
}

export interface TransactionBody {
    name: string,
    amount: string,
    type: string,
    userId: number
}