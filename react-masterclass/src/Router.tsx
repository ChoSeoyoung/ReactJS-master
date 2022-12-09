import {createBrowserRouter, Routes, Route} from "react-router-dom";
import App from "./App";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

{/* <BrowserRouter>
    <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
    </Routes>
</BrowserRouter> */}
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Coins />
            },
            {
                path:"coin/:coinId/*",
                element: <Coin />
            }
        ]
    }
])
export default router;
