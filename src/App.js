import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Discography from "./components/Discography";
import LoginPage from "./components/LoginPage";
import CartPage from "./components/CartPage";
import MerchandisePage from "./components/MerchandisePage";
import Signup from "./components/Signup";
import Footer from "./components/Footer";
import "./App.css"
import './MusicPlayer.css';
import { UserProvider } from "./contexts/UserContext";
import AlbumForm from "./components/AlbumForm";
import Album from "./components/album";
import { CartProvider } from "./contexts/CartContext";
import UserProfile from "./components/UserProfile";

const App = () =>{

  return (
    <>
      <UserProvider>
        <CartProvider>
        <Router>
          <div className="bg-body-secondary text-dark vh-100 d-flex flex-column">
            <Header/>
            <div className="bakround">
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/discography" element={<Discography />} />
                <Route path="/merch" element={<MerchandisePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/albumForm" element={<AlbumForm />}/>
                <Route path="/profile/:userId" element={<UserProfile/>}/>
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
        </CartProvider>
      </UserProvider>
  </>
  );
}

export default App;
