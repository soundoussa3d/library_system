
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Books from './component/Books'
import Form1 from './component/Form'

 function App() {
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/commande" element={<Form1/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
