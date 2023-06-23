import './App.scss'
import { Routes, Route } from 'react-router-dom';
import ParkingManagement from './components/ParkingManagement'

function App() {

  return (
    <div className='app'>
      <h1>🚗 Parking Management System 🚗</h1>
      <Routes>
        <Route path='/' element={<ParkingManagement />} />
      </Routes>
    </div>
  )
}

export default App
