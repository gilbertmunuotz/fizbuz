import DrawerNav from "./DrawerNav";

export default function TopNav() {
    return (
        <>
            <div className="topnav">
                <div>
                    <DrawerNav />
                    <h1 className="text-3xl text-center font-semibold py-6 mb-6">Welcome FizBuzz</h1>
                </div>
            </div>
        </>
    )
}