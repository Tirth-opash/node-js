
import './App.css';
import Footer from './componants/Footer';
import Nav from './componants/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SingUp from './componants/SingUp';
import PrivateComponant from './componants/PrivateComponant';
import Login from './componants/Login';
import AddProduct from './componants/AddProduct';
import ProductList from './componants/ProductList';
import UpdateProduct from './componants/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponant/>}>
          <Route path='/' element={<ProductList/>} />
          <Route path='/add' element={<AddProduct/>} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout' element={<h1>this is a logout route</h1>} />
          <Route path='/profile' element={<h1>this is a profile route</h1>} />
          </Route>
          <Route path="/register" element={<SingUp />} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
