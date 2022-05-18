import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState()
  const [userid, setuserid] = useState()
  const [pwd, setpwd] = useState()

  //store input field values for admin
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  //validate bidders login
  const handleSubmit2 = (e) => {
    e.preventDefault()
    if (userid == undefined || pwd == undefined) {
      toast.error('Please provide userid and password')
      return
    }
    axios
      .post('http://localhost:8060/api/bidders/validate', {
        userName: userid,
        password: pwd,
      })
      .then((resp) => {
        console.log(resp.data)
        sessionStorage.setItem('uname', resp.data.name)
        sessionStorage.setItem('role', 'User')
        sessionStorage.setItem('id', resp.data.bidderId)
        dispatch({ type: 'IsLoggedIn' })
        toast.success('Login successfull')
        navigate('/profile')
      })
      .catch((err) => {
        toast.error(err.response.data)
      })
  }

  //create admin user
  const handleCreateAdmin = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8060/api/admin', {
        userName: user.userid,
        password: user.pwd,
      })
      .then((resp) => {
        toast.success('Admin registered successfull')
      })
      .catch((error) => {
        console.log('Error', error)
        toast.error('Unable to register admin')
      })
  }
  //login validation method
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8060/api/admin/validate', {
        userName: user.userid,
        password: user.pwd,
      })
      .then((resp) => {
        console.log(resp.data)
        sessionStorage.setItem('uname', 'Administrator')
        sessionStorage.setItem('role', 'Admin')
        dispatch({ type: 'IsLoggedIn' })
        toast.success('Login successfull')
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log('Error', error)
        toast.error('Invalid username or password')
      })
  }

  return (
    <div className='login'>
      <div
        className='jumbotron p-4 text-white text-center border-bottom mb-0'
        style={{ backgroundColor: '#0ea630' }}
      >
        <h4>Welcome to IPL Fantasy League</h4>
      </div>
      <div className='container pt-4'>
        <div className='row'>
          <div className='col-sm-5'>
            <form className='card shadow mt-5' onSubmit={handleSubmit}>
              <div className='card-header'>
                <h5 className='text-center'>Admin Login</h5>
              </div>
              <div className='card-body'>
                <div className='form-group form-row'>
                  <label className='col-sm-4 col-form-label'>User Id</label>
                  <div className='col-sm-8'>
                    <input
                      type='text'
                      name='userid'
                      required
                      className='form-control'
                      placeholder='User Id'
                      value={user?.userid}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className='form-group form-row'>
                  <label className='col-sm-4 col-form-label'>Password</label>
                  <div className='col-sm-8'>
                    <input
                      type='password'
                      required
                      className='form-control'
                      name='pwd'
                      placeholder='Password'
                      value={user?.pwd}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <button className='btn btn-primary float-right'>Login</button>
                <button
                  onClick={handleCreateAdmin}
                  className='btn btn-danger float-right mr-2'
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>

          <div className='col-sm-5 offset-2'>
            <form className='card shadow mt-5' onSubmit={handleSubmit2}>
              <div className='card-header'>
                <h5 className='text-center'>Bidder Login</h5>
              </div>
              <div className='card-body'>
                <div className='form-group form-row'>
                  <label className='col-sm-4 col-form-label'>User Id</label>
                  <div className='col-sm-8'>
                    <input
                      className='form-control'
                      placeholder='User Id'
                      value={userid}
                      onChange={(e) => setuserid(e.target.value)}
                    />
                  </div>
                </div>
                <div className='form-group form-row'>
                  <label className='col-sm-4 col-form-label'>Password</label>
                  <div className='col-sm-8'>
                    <input
                      type='password'
                      className='form-control'
                      placeholder='Password'
                      value={pwd}
                      onChange={(e) => setpwd(e.target.value)}
                    />
                  </div>
                </div>
                <button className='btn btn-primary float-right'>Login</button>
                <Link to='register'>Not registered Click here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
