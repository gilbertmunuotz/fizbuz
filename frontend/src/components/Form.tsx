import { toast } from "react-toastify";
import React, { useState } from "react";
import { ModalProps, Transaction } from "../Interfaces/interface";
import { useAddNewTransactionMutation } from "../api/TransactionSlice";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

export default function Form({ open, close }: ModalProps) {


    const [name, setName] = useState<string>(''); // Track Transaction
    const [type, setType] = useState("expense"); // Track Transaction Type (Default set to Expense)
    const [amount, setAmount] = useState<string>('');  // Track The Amount

    // Destructure Hook
    const [addNewTransaction, { isError, isLoading }] = useAddNewTransactionMutation();

    // Handle Data Submission
    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        const newTransaction: Transaction = { name, amount, type };

        try {
            await addNewTransaction(newTransaction).unwrap();
            setName('')
            setType('')
            setAmount('')
            toast.success("Transaction Created Successfully");
            console.log(newTransaction);

        } catch (error) {
            console.error("Error Creating Transaction", error);
            toast.error("Sorry, an error occurred.");
        }

        if (isError) {
            toast.error("Sorry, an error occurred.");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Check if the input is a valid number
        if (!value || !isNaN(Number(value))) {
            setAmount(value);
        } else {
            alert('Please enter a valid number.');
            setAmount(''); // Reset the input field to empty
        }
    };

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
                                    value={name}
                                    label="Enter Transaction"
                                    placeholder="E.g Food, Rent, Transportation....."
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </div>

                            <TextField
                                fullWidth
                                required
                                value={amount}
                                variant="outlined"
                                label="Enter Amount"
                                placeholder="E.g 1200"
                                onChange={handleChange}
                            />

                            <div className="flex gap-6 mt-2">
                                <label>
                                    <input type="radio" value="expense" checked={type === "expense"} onChange={() => setType("expense")} /> Expense
                                </label>
                                <label>
                                    <input type="radio" value="income" checked={type === "income"} onChange={() => setType("income")} /> Income
                                </label>
                            </div>

                            {isLoading ?
                                <button
                                    type="submit"
                                    className="my-3 py-2 px-28 rounded-md cursor-not-allowed text-white uppercase" style={{ backgroundColor: '#1565c0' }}>Creating...........</button>
                                : <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2 }} className="rounded-xl">Create</Button>
                            }

                        </form>

                    </Box>
                </Modal>
            </>
        </div >
    )
}