import { UAParser } from "ua-parser-js";
import { useSelector } from "react-redux";
import { user } from "../assets/authSlice";
import { AuthResponse } from "../Interfaces/interface";
import { useUseSessionsQuery } from "../api/AuthSlice";

export default function Sessions() {

    // Extract User id to pass it to useUseSessionsQuery
    const userInfo = useSelector(user) as AuthResponse;
    const userId = userInfo.id;

    // Use rtk hook
    const { data, isError } = useUseSessionsQuery(userId);


    // Extract the first session object safely
    const session = data?.user?.[0];

    // Grab the user agent string
    const userAgent = data?.user?.[0].userAgent;

    // Pass the user agent string to the parser
    const parser = new UAParser(userAgent);

    // Extract the browser, device and OS information
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    return (
        <div>
            <h1 className="font-semibold text-lg">Web Sessions</h1>

            <hr className="border-y mb-2" />

            {isError && <p className="text-red-500">Error fetching sessions. Please try again later.</p>}

            {session ? (
                <div className="space-y-4">
                    <div className="bg-gray-100 p-4 rounded-lg border">
                        <div className="flex items-center justify-between">
                            <div>

                                <p className="text-sm text-gray-500">Your current session</p>
                                <div className="flex justify-between">
                                    <span className="text-green-500">● Active</span>
                                    <h2 className="font-semibold text-gray-800">{session.ipAddress}</h2>
                                </div>
                                {/* Display parsed details */}
                                <p className="text-sm text-gray-500">
                                    {browser.name} on {os.name} {os.version} {device.type && `on ${device.type}`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500">No active sessions found.</p>
            )}

        </div>
    )
}
