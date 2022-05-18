import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

function LeaderBoard() {
  const [users, setUsers] = useState([])
  const loadData = () => {
    axios.get('http://localhost:8060/api/users').then((resp) => {
      setUsers(resp.data)
    })
  }

  useEffect(() => {
    loadData()
  }, [])
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <div className='row'>
          <div
            className='col-sm-2 bg-transparent p-0 border-right border-primary'
            style={{ height: 'calc(100vh - 80px)' }}
          >
            <Navbar />
          </div>
          <div className='col-sm-10'>
            <h4 className='text-left p-2 border-bottom border-success'>
              All Users
            </h4>
            <table className='table table-bordered table-light table-hover'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Password</th>
                  <th>Userid</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.uname}</td>
                    <td>{x.gender}</td>
                    <td>{x.password}</td>
                    <td>{x.userid}</td>
                    <td>{x.admin ? 'Admin' : 'User'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderBoard
