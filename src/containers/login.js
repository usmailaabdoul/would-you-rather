import { useEffect } from 'react'
import { getInitialData } from '../redux/actions/shared';
import { connect } from 'react-redux'

const Login = ({getInitialData}) => {

  useEffect(() => {
    getInitialData()
  }, [getInitialData]);

  return (
    <div>
      Login
    </div>
  )
}

export default connect(null, {getInitialData})(Login)
