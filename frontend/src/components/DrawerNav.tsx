import { useState } from 'react';
import photo from "/photorealistic.jpg";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon sx={{ color: 'black', fontSize: 30 }} /> },
    { name: "Transactions", path: "/transactions", icon: <PaidIcon sx={{ color: 'black', fontSize: 30 }} /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon sx={{ color: 'black', fontSize: 30 }} /> },
];

export default function DrawerNav() {

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
            >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <div className={`fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition duration-200 ease-in-out z-30 w-64 bg-white shadow-lg`}>
                <div className="p-6">
                    <img src={photo} className="rounded-full mt-3 mb-4 cursor-pointer" alt="Profile" />
                    <nav>
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-md transition-colors ${location.pathname === item.path
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:bg-gray-100"
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