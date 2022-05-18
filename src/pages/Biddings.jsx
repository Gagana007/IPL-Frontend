import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'

function Biddings() {
  const [biddings, setbiddings] = useState([])
  const userid = sessionStorage.getItem('id')
  const role = sessionStorage.getItem('role')

  //load data at startup
  const loadData = () => {
    if (role === 'User')
      axios
        .get('http://localhost:8060/api/bidders/bids?bidderid=' + userid)
        .then((resp) => {
          setbiddings(resp.data)
        })
    else
      axios.get('http://localhost:8060/api/bidders/bids').then((resp) => {
        setbiddings(resp.data)
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
              Biddings
            </h4>
            <table className='table table-bordered table-light table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Match</th>
                  <th>Opinion</th>
                  <th>Result</th>
                  <th>Win/Loss</th>
                  <th>Bidder</th>
                </tr>
              </thead>
              <tbody>
                {biddings.map((x) => (
                  <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>
                      {x.match.teamOne.tname + ' vs ' + x.match.teamTwo.tname}
                    </td>
                    <td>{x.opinion}</td>
                    <td>{x.result}</td>
                    <td>
                      {x.result && x.result == x.opinion
                        ? 'Win'
                        : x.result && x.result != x.opinion
                        ? 'Loss'
                        : null}
                    </td>
                    <td>{x.bidder.name}</td>
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

export default Biddings
