
import SignUp from '@pages/SignUp'
import Home from '@pages/Home'
import SignIn from '@pages/SignIn'
import './App.css'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
