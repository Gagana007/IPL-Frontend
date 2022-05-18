import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
var classNames = require('classnames')

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const role = sessionStorage.getItem('role')
  const navclass = 'list-group-item list-group-item-action p-2 text-left'
  console.log(location.pathname)
  //logout from the system
  const logout = () => {
    dispatch({ type: 'LogOut' })
    sessionStorage.clear()
    navigate('/')
  }
  return (
    <div className='list-group list-group-flush'>
      {role === 'Admin' ? (
        <>
          <Link
            to='/dashboard'
            className={classNames(navclass, {
              active: location.pathname == '/dashboard',
            })}
          >
            Dashboard
          </Link>
          <Link
            to='/tournaments'
            className={classNames(navclass, {
              active: location.pathname == '/tournaments',
            })}
          >
            Tournaments
          </Link>
          <Link
            to='/teams'
            className={classNames(navclass, {
              active: location.pathname == '/teams',
            })}
          >
            Teams
          </Link>
          <Link
            to='/matches'
            className={classNames(navclass, {
              active: location.pathname == '/matches',
            })}
          >
            Create Matches
          </Link>
          <Link
            to='/schedule'
            className={classNames(navclass, {
              active: location.pathname == '/schedule',
            })}
          >
            Schedule Match
          </Link>
          <Link
            to='/update'
            className={classNames(navclass, {
              active: location.pathname == '/update',
            })}
          >
            Update Match
          </Link>
          <Link
            to='/bidders'
            className={classNames(navclass, {
              active: location.pathname == '/bidders',
            })}
          >
            Bidders
          </Link>
          <Link
            to='/biddings'
            className={classNames(navclass, {
              active: location.pathname == '/biddings',
            })}
          >
            Biddings
          </Link>
        </>
      ) : (
        <>
          <Link
            to='/profile'
            className={classNames(navclass, {
              active: location.pathname == '/profile',
            })}
          >
            Profile
          </Link>
          <Link
            to='/createbid'
            className={classNames(navclass, {
              active: location.pathname == '/createbid',
            })}
          >
            Create Bidding
          </Link>
          <Link
            to='/biddings'
            className={classNames(navclass, {
              active: location.pathname == '/biddings',
            })}
          >
            Biddings
          </Link>
        </>
      )}
      <button
        onClick={() => logout()}
        className={classNames(navclass, 'btn-link')}
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
