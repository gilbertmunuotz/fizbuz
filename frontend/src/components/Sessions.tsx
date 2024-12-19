import { useEffect } from "react";
import { useSelector } from "react-redux";
import { user } from "../assets/authSlice";
import { formatDate } from "../utilities/DateFunc";
import { AuthResponse } from "../Interfaces/interface";
import { useUseSessionsQuery } from "../api/AuthSlice";


export default function Sessions() {

    // Extract User id to pass it to useUseSessionsQuery
    const userInfo = useSelector(user) as AuthResponse;
    const userId = userInfo.id;

    // Use rtk hook
    const { data, isError } = useUseSessionsQuery(userId);


    // Render data on page Load
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data])

    return (
        <div>
            <h1 className="font-semibold text-lg">Web Sessions</h1>

            <hr className="border-y mb-2" />

            {isError && <p className="text-red-500">Error fetching sessions. Please try again later.</p>}

            {data && (
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Your current session</p>
                                <div className="flex justify-between">
                                    <span className="text-green-500">● Active</span>
                                    <h2 className="font-semibold text-gray-800">{data.user.ipAddress}</h2>
                                </div>
                                <p className="text-sm text-gray-500">Last Seen on: {formatDate(data.user.updatedAt ?? '')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
