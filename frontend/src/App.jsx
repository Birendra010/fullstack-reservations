import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/home/Home"
import List from "./pages/list/List";
import HotelByCity from "./pages/hotelByCity/HotelByCity";
import Hotel from "./pages/hotel/Hotel";
import Hotels from "./pages/hotels/Hotels";
import './App.css'
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/hotels" element={<List />}></Route>
        <Route path="/hotel-list" element={<HotelByCity />}></Route>
        <Route path="/allHotels" element={<Hotels />}></Route>

        <Route path="/hotels/:id" element={<Hotel />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
