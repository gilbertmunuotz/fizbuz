import Chart from "./components/Chart";
import TopNav from "./components/TopNav";
import 'react-toastify/dist/ReactToastify.css';
import Transactions from "./components/Transactions";
import { Slide, ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
      <div className="mx-6">
        <TopNav />
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
  )
}

export default App;