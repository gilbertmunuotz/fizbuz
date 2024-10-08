import React, { useState } from "react";

import { ModalProps } from "../Interfaces/interface";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function Form({ open, close }: ModalProps) {

    // Track Transaction
    const [transaction, setTransaction] = useState<string>('');

    // Track Transaction Type (Default set to Expense)
    const [categoryType, setCategoryType] = useState("expense");

    // Track The Amount
    const [amount, setAmount] = useState<number>();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const newTransaction = { transaction, categoryType };
        console.log(newTransaction);
    }

    return (
        <div>
            <>
                <Modal open={open} onClose={close}>
                    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, border: '1px solid #000', p: 4, backgroundColor: 'background.paper', boxShadow: 24, maxHeight: '80vh', overflow: 'auto', }}> <Typography className="text-center">
                        Create New Transaction
                    </Typography>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">

                                <TextField
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    value={transaction}
                                    label="Enter Transaction"
                                    placeholder="E.g Food, Rent, Transportation....."
                                    onChange={(event) => setTransaction(event.target.value)}
                                />
                            </div>

                            <TextField
                                fullWidth
                                required
                                value={amount}
                                variant="outlined"
                                label="Enter Amount"
                                placeholder="E.g 1200/="
                                onChange={(event) => setAmount(event.target.value)}
                            />

                            <div className="flex gap-6 mt-2">
                                <label>
                                    <input type="radio" value="expense" checked={categoryType === "expense"} onChange={() => setCategoryType("expense")} /> Expense
                                </label>
                                <label>
                                    <input type="radio" value="income" checked={categoryType === "income"} onChange={() => setCategoryType("income")} /> Income
                                </label>
                            </div>

                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }} className="rounded-xl">Create</Button>
                        </form>
                    </Box>
                </Modal>
            </>
        </div >
    )
}