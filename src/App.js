import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import UsersData from "./component/Users/Users";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UsersData />} />  </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
