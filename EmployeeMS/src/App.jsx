import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Employee from './components/Employee'
import Category from './components/Category'
import AddCategory from './components/addCategory'
import AddEmployee from './components/AddEmployee'
import EditEmployee from './components/EditEmployee'
import Start from './components/Start'
import EmployeeLogin from './components/EmployeeLogin'
import EmployeeDetail from './components/EmployeeDetail'
import PrivateRoute from './components/PrivateRoute'
import AidEmployee from './components/AidEmployee'
import ListAid from './components/ListAid'
import DieEmployee from './components/DieEmployee'
import SickEmployee from './components/SickEmployee'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/employeelogin' element={<EmployeeLogin />}></Route>
      <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/dieemployee' element={<DieEmployee />}></Route>
        <Route path='/dashboard/sickemployee' element={<SickEmployee />}></Route>
        <Route path='/dashboard/aidemployee' element={<AidEmployee />}></Route>
        <Route path='/dashboard/listaid' element={<ListAid />}></Route>
        <Route path='/dashboard/addCategory' element={<AddCategory />}></Route>
        <Route path='/dashboard/addEmployee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/editEmployee/:id' element={<EditEmployee />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
