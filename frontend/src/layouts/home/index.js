import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  CssBaseline,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';

import Footer from '../../components/footer/index.js';
import useStyles from './styles.js';
import { useSelector } from 'react-redux'

function Home() {
  const classes = useStyles();


  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item md="5" sm="12">
          <Typography variant="h5" className={classes.welcome}>
            WELCOME TO DRAW &amp; GUESS
          </Typography>
          <Typography variant="h6" className={classes.welcome}>
            A massively multiplayer free to play pictionary game!
          </Typography>

          <Typography variant="h6" className={classes.welcome}>
            Don't have an account?
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/sign-up"
          >
            Sign up
          </Button>
          <Typography variant="h6" className={classes.welcome}>
            Already have an account?
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/login"
          >
            Log in
          </Button>
        </Grid>
        <Grid item md="7" sm="12">
          <div>
            <Paper className={classes.paper}>
              <Typography variant="h6">Easy to play</Typography>
            </Paper>
            <NumberInput id="roomId" name="roomId" classes={classes} />
          </div>
        </Grid>
        <Grid item xs="12">
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}

function NumberInput({ id, name, classes }) {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">Join as Guest</Typography>
      <TextField
        variant="outlined"
        fullWidth
        id={id}
        placeholder="Enter room code"
        name={name}
        type="text"
        InputProps={
          //Props applied to the <Input/> element of material UI
          {
            endAdornment: (
              <IconButton type="submit" aria-label="Join Roon">
                <ExitToApp />
              </IconButton>
            ),
          }
        }
      />
    </Paper>
  );
}

export default Home;
