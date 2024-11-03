import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
                    <h1 className="text-3xl font-bold text-center mb-6">Welcome Back.</h1>

                    <form className="space-y-5">

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                required
                                type="text"
                                name="email"
                                placeholder="E.g johnson@gmail.com"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                required
                                placeholder="E.g john@4545."
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

                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            Sign In
                        </button>

                        <hr className="border-y border-black" />

                        <div className="flex justify-between">
                            <h2 className='ml-2'>Don't have an account?<Link to={"/register"} className='text-sky-600'> Register</Link></h2>
                            <h3 className="ml-2"><Link to={"/forgot-password"} className='text-sky-600'> forgot Password</Link></h3>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}