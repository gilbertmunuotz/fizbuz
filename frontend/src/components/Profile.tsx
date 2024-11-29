import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { user } from "../assets/authSlice";
import { AuthResponse } from "../Interfaces/interface";
import { useGetUserInfoQuery } from "../api/UserSlice";


export default function Profile() {

    // Extract User Name from User Slice to display on UI
    const userInfo = useSelector(user) as AuthResponse;
    const username = userInfo.name;

    // Extract User id to pass it to useGetUserInfoQuery
    const userId = userInfo.id;


    // Manage Form State
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // use rtk hook
    const { data } = useGetUserInfoQuery(userId);

    useEffect(() => {
        if (data) {
            setName(data.user.name);
            setEmail(data.user.email);
        }
    }, [data]);


    return (
        <div>
            <h5 className="ml-12 mb-4 font-semibold text-lg">Hello {username}!</h5>
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
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-1 bg-indigo-600 rounded-full text-white">Update</button>
                </div>
            </form>
        </div>
    )
}