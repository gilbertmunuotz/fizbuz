import TopNav from "../components/TopNav";
import Profile from "../components/Profile";
import Sessions from "../components/Sessions";

export default function Settings() {
    return (
        <div>
            <TopNav />

            {/* Add responsive padding to the main content to offset the DrawerNav on larger screens */}
            <div className="lg:ml-64 p-6">
                {/* Responsive container */}
                <div className="flex flex-col lg:flex-row lg:gap-10 lg:items-stretch">
                    {/* Profile component, full width on mobile, three-quarters on larger screens */}
                    <div className="w-full lg:w-3/4">
                        <Profile />
                    </div>

                    {/* Sessions component, full width on mobile, occupying the remaining space */}
                    <div className="w-full lg:w-1/4">
                        <Sessions />
                    </div>
                </div>
            </div>
        </div>
    );
}