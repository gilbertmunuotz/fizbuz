import { useState } from "react";


export default function Profile() {

    // Manage Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <h5 className="ml-12 mb-3">Hello $username</h5>
            <form className="space-y-5 ml-12 mr-52">
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
                        value={password}
                        placeholder="E.g john@4545."
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    />
                </div>

                <hr className="border-y border-black" />
            </form>
        </div>
    )
}