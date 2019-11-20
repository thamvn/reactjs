import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import md5 from 'md5';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
class SingIn extends Component {
    constructor(props){
        super(props)
        this.state={
            email:"",
            password:"",
            emailErr: "",
            passwordErr: "",
            redirect: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    hangdleChangeUsername(e){
        var regexEmail= /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
        var email=e.target.value
        if(!regexEmail.test(email)){
            this.setState({emailErr:"email invalid!"})
        }
        else this.setState({emailErr:""})
        this.setState({
            email: email
        })
    }
    hangdleChangePassword(e){
        var password = e.target.value
        if(password.length<6){
            this.setState({passwordErr: "The password is too short"})
        }
        else this.setState({passwordErr: ""})
        this.setState({
            password: password
        })
    }
    handleSubmit(e){
        e.preventDefault();
        var data = {email:this.state.email,password: md5(this.state.password)}
        axios.post('http://localhost:5000/signin',data)
        .then((res)=>{ 
            if(res.data.token){
              sessionStorage.setItem("Auth",JSON.stringify(res.data.token))
              this.setState({redirect: true})
            }
            else{
              alert(res.data)
            }
        })
          .catch(function (error) {
            console.log(error);
          });
    }
    render() {
      let redirect = this.state.redirect
      if(redirect){ return <Redirect to="/home" />}
        return ( 
            <div>
                <form noValidate onSubmit={(e)=>this.handleSubmit(e)}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={this.state.email}
                    onChange={(e)=>this.hangdleChangeUsername(e)}
                />
                <Typography color="secondary">{this.state.emailErr}
                </Typography>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={this.state.password}
                    onChange={(e)=>this.hangdleChangePassword(e)}
                  /><Typography color="secondary">{this.state.passwordErr}
                  </Typography>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
            </div>
        );
    }
}

export default SingIn;