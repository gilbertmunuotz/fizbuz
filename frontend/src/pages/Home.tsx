import Chart from "../components/Chart";
import TopNav from "../components/TopNav";
import Transactions from "../components/Transactions";

export default function Home() {
    return (
        <>
            <TopNav />
            <div className="mx-6">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <Chart />
                    </div>
                    <div className="w-full md:w-1/2">
                        <Transactions />
                    </div>
                </div>
            </div>
        </>
    );
}