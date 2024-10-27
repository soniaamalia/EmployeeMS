import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const[adminTotal, setadminTotal] = useState(0)
  const[employeeTotal, setemployeeTotal] = useState(0)
  const[salaryTotal, setsalaryTotal] = useState(0)
  const[adminRecord, setadminRecord] = useState([])
  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  }, [])
  const adminRecords = () => {
    axios.get('http://localhost:3000/auth/admRecords')
    .then(result => {
      if(result.data.Status){
        setadminRecord(result.data.Result)
      } else {
        alert(result.data.Error)
      }
    })
  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/adminSum')
    .then(result => {
      if(result.data.Status){
        setadminTotal(result.data.Result[0].admin)
      }
    })
  }
  const employeeCount = () => {
    axios.get('http://localhost:3000/auth/employeeSum')
    .then(result => {
      if(result.data.Status){
        setemployeeTotal(result.data.Result[0].employee)
      }
    })
  }
  const salaryCount = () => {
    axios.get('http://localhost:3000/auth/salarySum')
    .then(result => {
      if(result.data.Status){
        setsalaryTotal(result.data.Result[0].salary)
      }
    })
  }
  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>IDR {salaryTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              adminRecord.map(a => (
                <tr key={a.id}>
                  <td>{a.email}</td>
                  <td>
                      <button  
                          className='btn btn-warning btn-sm me-2'>
                          Edit
                      </button>
                      <button 
                          className='btn btn-danger btn-sm'>
                          Delete
                      </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
