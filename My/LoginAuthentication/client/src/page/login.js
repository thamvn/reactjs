import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SingIn from '../component/SignIn';
class login extends React.Component {
    render() {
        return (
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div>
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                  <SingIn/> {/*Call component event*/}
              </div>
              <Box mt={8}>
              </Box>
            </Container>
          );
    }
}
export default login;