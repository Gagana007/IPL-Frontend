import axios from 'axios'
import { parse } from 'date-fns'
import { format } from 'date-fns/esm'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

function Bidders() {
  const [bidders, setbidders] = useState([])
  const [teams, setteams] = useState([])
  const [teamOne, setteamOne] = useState()
  const [teamTwo, setteamTwo] = useState()
  const loadData = () => {
    axios.get('http://localhost:8060/api/bidders').then((resp) => {
      setbidders(resp.data)
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
            <div className='row'>
              <div className='col-sm-12'>
                <h4 className='text-left p-2 border-bottom border-success'>
                  All Bidders
                </h4>
                <table className='table table-bordered table-light table-sm table-hover'>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email Id</th>
                      <th>User Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidders.map((x) => (
                      <tr key={x.bidderId}>
                        <td>{x.bidderId}</td>
                        <td>{x.name}</td>
                        <td>{x.phone}</td>
                        <td>{x.email}</td>
                        <td>{x.userName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Bidders
