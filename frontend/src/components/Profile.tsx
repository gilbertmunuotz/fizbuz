import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AuthResponse } from "../Interfaces/interface";
import { user } from "../assets/authSlice";
import { useGetUserInfoQuery, useUpdateUserMutation } from "../api/UserSlice";


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

    // use rtk hook to Get user Data
    const { data } = useGetUserInfoQuery(userId);

    // Render Data on Page Load
    useEffect(() => {
        if (data?.user) {
            setName(data.user.name);
            setEmail(data.user.email);
        }
    }, [data]);


    // use rtk hook to Update user Data
    const [update, { isLoading }] = useUpdateUserMutation();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault()

        try {
            // Make the API call and get the updated user data
            await update({ id: userId, name, email, password }).unwrap();

            setPassword("");
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error Updating Profile", error);
            toast.error("Error Occured, Try Again");
        }
    }

    return (
        <div>
            <h5 className="mb-4 font-semibold text-lg">Hello {data?.user.name || username}!</h5>

            <form className="space-y-5" onSubmit={handleSubmit}>
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
                    {isLoading ? (
                        <button type="submit" disabled={isLoading} className="px-4 py-1 bg-indigo-600 rounded-full text-white cursor-not-allowed">Updating...</button>
                    ) : (
                        <button type="submit" className="px-4 py-1 bg-indigo-600 rounded-full text-white">Update</button>
                    )}
                </div>
            </form>
        </div>
    )
}