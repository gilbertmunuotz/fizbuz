import Chart from "../components/Chart";
import TopNav from "../components/TopNav";
import Transactions from "../components/Transactions";

export default function Home() {
    return (
        <>
            <TopNav />
            {/* Add responsive padding to the main content to offset the DrawerNav on larger screens */}
            <div className="lg:ml-64 mx-6 my-4"> 
                {/* Responsive container */}
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Chart component, full width on mobile, half on larger screens */}
                    <div className="w-full lg:w-1/2">
                        <Chart />
                    </div>
                    {/* Transactions component, full width on mobile, half on larger screens */}
                    <div className="w-full lg:w-1/2">
                        <Transactions />
                    </div>
                </div>
            </div>
        </>
    );
}