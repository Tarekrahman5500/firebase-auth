import GoggleGit from "./Files/GoggleGit";
import Header from "./Components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NoMatch from "./Components/NoMatch/NoMatch";
import './App.css'
import AuthProvider from "./context/AuthProvider";
import Shipping from "./Components/Shipping/Shipping";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PlaceOrder from "./Components/PlaceOrder/PlaceOrder";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path="/home" element={<Home/>}>
                        </Route>
                        <Route path="/login" element={<Login/>}>
                        </Route>
                        <Route path="/register" element={<Register/>}>
                        </Route>
                         <Route path="/*" element={<PrivateRoute/>}>
                            <Route path='shipping' element={<Shipping />}/>
                            <Route path='order' element={<PlaceOrder/>}/>
                        </Route>
                   {/*     <Route path="/Shipping" element={<PrivateRoute><Shipping/></PrivateRoute>}></Route>*/}
                       {/* <Route path="/order" element={<PrivateRoute><PlaceOrder/></PrivateRoute>}></Route>*/}

                        <Route path="/" element={<Home/>}>
                        </Route>
                        <Route path="*" element={<NoMatch/>}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            {/*sign in from Google and GitHub*/}
            {/* <GoggleGit/>*/}
        </div>
    );
}

export default App;
