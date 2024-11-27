import { useState } from 'react';
import { toast } from 'react-toastify';
import photo from "/photorealistic.jpg";
import { useDispatch } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutSuccess } from "../assets/authSlice";
import { useLogoutMutation } from '../api/AuthSlice';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon sx={{ color: 'black', fontSize: 30 }} /> },
    { name: "Transactions", path: "/transactions", icon: <PaidIcon sx={{ color: 'black', fontSize: 30 }} /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon sx={{ color: 'black', fontSize: 30 }} /> },
];

export default function DrawerNav() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Destructure Redux Hook
    const [logout, { isLoading, isError }] = useLogoutMutation();

    // Logout Logic
    async function handleLogout(event: React.FormEvent) {

        event.preventDefault()

        try {
            const user = await logout().unwrap();
            dispatch(logoutSuccess(user));
            toast.success("Logged Out Succesfully!");
            navigate("/login");
        } catch (error) {
            console.error('Error Logging Out', error);
            toast.error("Error During Logging Out");
        }
    }

    // Handle Any Errors if any
    if (isError) {
        console.error("Error Occurred");
        toast.error("Sorry, an error occurred.!");
    }

    // Managing Opening & closing of Drawer
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <div>
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md"
                onClick={toggleDrawer}
                aria-label="Toggle navigation menu"
            > {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-gray-100 shadow-lg`}>
                <div className="p-6 flex flex-col h-full">
                    <img src={photo} className="rounded-full mt-3 mb-4 cursor-pointer" alt="Profile" />
                    <nav>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-md transition-colors ${location.pathname === item.path
                                            ? "bg-indigo-600 text-white transition-colors"
                                            : "text-black"
                                            }`}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.icon}
                                        <span className="ml-2">{item.name}</span> {/* Space between icon and name */}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Tooltip title={'Log Out'}>
                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={handleLogout}
                            className='mt-auto mx-2 py-3 bg-red-600/100 rounded-full text-white'>
                            <LogoutIcon /> Log Out
                        </button>
                    </Tooltip>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={toggleDrawer}
                ></div>
            )}
        </div>
    );
}