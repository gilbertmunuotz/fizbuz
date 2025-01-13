import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Credentials } from "../Interfaces/interface";
import { useRegisterMutation } from "../api/AuthSlice";

export default function Register() {

    // Form State Hooks
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // Destructure rtk Hook
    const [register, { isLoading }] = useRegisterMutation();

    // Destructure React Router Dom Hook
    const navigate = useNavigate();

    // Handle Form Submission
    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const user: Credentials = { name, email, password };

        try {
            await register(user).unwrap();
            setName('');
            setEmail('');
            setPassword('');
            toast.success("Login To Continue");
            navigate("/login");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error During Registration", error);
            if (error?.data?.message) {
                toast.error(error.data.message);
            } else if (error) {
                toast.error("Error During Sign Up.!");
            } else {
                toast.error("Sorry, an error occurred.");
            }

        }
    }

    return (
        <div>
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">Sign Up.</h1>

                    <form className="space-y-5" onSubmit={HandleSubmit}>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                id="name"
                                required
                                type="text"
                                value={name}
                                placeholder="E.g Johnson"
                                onChange={(event) => setName(event.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                required
                                type="text"
                                value={email}
                                placeholder="E.g johnson@gmail.com"
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                required
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                placeholder="E.g john@4545."
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                required
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            />
                            <h1 className="ml-2">Remember Me</h1>
                        </div>

                        {isLoading ?
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                Signing Up....
                            </button>
                            :
                            <button type="submit" className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">Sign Up</button>
                        }

                        <hr className="border-y border-black" />

                        <h2 className='ml-2 mt-2'>Already have an account? Login<Link to={"/login"} className='text-sky-600'> Here</Link></h2>

                    </form>

                </div>
            </div>
        </div>
    )
}