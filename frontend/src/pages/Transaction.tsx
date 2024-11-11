import DrawerNav from "../components/DrawerNav";
import TopNav from "../components/TopNav";

export default function Transaction() {
    return (
        <>
            <TopNav />
            {/* Add responsive padding to the main content to offset the DrawerNav on larger screens */}
            <div className="lg:ml-64 mx-6 my-4">
                <h1>Transaction Page</h1>
                <DrawerNav />
            </div>
        </>
    )
}