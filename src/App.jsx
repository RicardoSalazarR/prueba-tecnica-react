import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { useSelector } from "react-redux";
import Home from './components/Home'
import NavBar from './components/NavBarComponent'
import ProductDetails from "./components/ProductDetails";
import CartView from './components/CartView'

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="App">
      <HashRouter>
        <NavBar />
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartView />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
