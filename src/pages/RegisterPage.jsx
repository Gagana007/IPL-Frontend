import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function RegisterPage() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //save data to database
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Info => ', user)
    if (
      !user?.name ||
      !user?.password ||
      !user?.userName ||
      !user?.email ||
      !user?.phone
    ) {
      toast.error('Please provide full details')
      return
    }
    axios
      .post('http://localhost:8060/api/bidders', user)
      .then((resp) => {
        console.log(resp)
        setUser(null)
        e.target.reset()
        toast.success('User registered successfully')
        navigate('/')
      })
      .catch((error) => toast.error(error.response.data))
  }

  return (
    <>
      <div className='jumbotron p-4 text-white text-center border-bottom mb-0 bg-dark'>
        <h4>Welcome to IPL Fantasy League</h4>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-sm-8 mx-auto'>
            <div className='card shadow mx-auto mt-3'>
              <div className='card-body'>
                <h4 className='text-center p-2'>Bidder Registration Form</h4>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-sm-6 mx-auto'>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Bidder Name
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='name'
                            value={user?.name}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Phone
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='phone'
                            maxLength={10}
                            value={user?.phone}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Email Id
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='email'
                            name='email'
                            value={user?.email}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          User Id
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='text'
                            name='userName'
                            value={user?.userName}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <div className='form-group form-row'>
                        <label className='col-sm-4 form-control-label'>
                          Password
                        </label>
                        <div className='col-sm-8'>
                          <input
                            type='password'
                            name='password'
                            value={user?.password}
                            onChange={handleInput}
                            className='form-control form-control-sm'
                          />
                        </div>
                      </div>
                      <button className='btn btn-primary btn-sm float-right'>
                        Register Now
                      </button>
                      <Link to='/'>Already registered Login</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage
