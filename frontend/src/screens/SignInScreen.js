import React,{useState, useEffect} from 'react';
import './SignInScreen.css'
import {useDispatch, useSelector} from 'react-redux'
import { login } from './../actions/userActions';

const SignInScreen = ({history}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  //get user from state
  const userLogin = useSelector(state => state.userLogin)
  const {loading, error, userInfo} = userLogin

  useEffect( () => {
    //if user is logged
    if(userInfo){
      history.push('/')
    }
  },[history, userInfo])


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }


    return ( 

        <div className="container-fluid">
          <div className="row no-gutter">
            <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
            <div className="col-md-8 col-lg-6">
              <div className="login d-flex align-items-center py-5">
                <div className="container">
                  <div className="row">
                    <div className="col-md-9 col-lg-8 mx-auto">
                      <h3 className="login-heading mb-4">Welcome back!</h3>
                      <form onSubmit={submitHandler}>
                        <div className="form-label-group">
                          <input 
                            type="email" 
                            id="inputEmail" 
                            className="form-control" 
                            placeholder="Email address" 
                            value={email}
                            onChange= {(e) => setEmail(e.target.value)}
                            required 
                            autofocus 
                          />
                          <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="form-label-group">
                          <input 
                            type="password" 
                            id="inputPassword" 
                            className="form-control" 
                            placeholder="Password" 
                            value={password}
                            onChange= {(e) => setPassword(e.target.value)}
                            required 
                          />
                          <label htmlFor="inputPassword">Password</label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                        <div className="text-center">
                          <a className="small" href="#">Forgot password?</a></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>





     );
}
 
export default SignInScreen;