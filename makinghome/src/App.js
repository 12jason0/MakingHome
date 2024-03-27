import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./commont/Header";
import Notfound from "./pages/Notfound";
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
