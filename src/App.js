import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./component/Header";
import Home from "./component/Home";
import Discography from "./component/Discography";
import LoginPage from "./component/LoginPage";
import CartPage from "./component/CartPage";
import MerchandisePage from "./component/MerchandisePage";
import Signup from "./component/Signup";
import Footer from "./component/Footer";
import "./App.css"
import './MusicPlayer.css';
import { UserProvider } from "./contexts/UserContext";
import AlbumForm from "./component/AlbumForm";

const App = () =>{

  

  return (
    <>
      <UserProvider>
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
                <Route path="/albumForm" element={<AlbumForm />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </UserProvider>
  </>
  );
}

export default App;
