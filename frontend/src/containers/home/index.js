import {
  Container,
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  CssBaseline,
  makeStyles,
} from '@material-ui/core';
import { Forward } from '@material-ui/icons';
import Footer from '../../components/footer/index.js';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    h5: {
      fontFamily: '"Gorditas", cursive',
    },
    h6: {
      fontFamily: '"Fredoka One", cursive',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navbarTitle: {
    textDecoration: 'none',
    color: 'blue',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
    marginLeft: theme.spacing(20),
    marginRight: theme.spacing(20),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(5),
  },
  welcome: {
    marginTop: theme.spacing(2),
  },
  icon: {
    marginLeft: '-60px',
    marginTop: '20px',
  },
  input: {
    width: '90%',
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Grid item sm="7" xs="12">
          <ThemeProvider theme={theme}>
            <Typography variant="h5" className={classes.welcome}>
              WELCOME TO DRAW&amp;GUESS
            </Typography>
          </ThemeProvider>

          <Typography variant="h6" className={classes.welcome}>
            A massively multiplayer free to play pictionary game!
          </Typography>
        </Grid>
        <Grid item sm="5" xs="12">
          <Divider className={classes.divider} />
          <div className={classes.container}>
            <div style={{ gridColumnEnd: 'span 5' }}>
              <Typography variant="h6" className={classes.welcome}>
                Don't have an account?
              </Typography>
              <Button href="/signup">
                <div className={classes.navbarTitle}>Sign up</div>
              </Button>
              <Typography variant="h6" className={classes.welcome}>
                Already have an account?
              </Typography>
              <Button href="/login">
                <div className={classes.navbarTitle}>Log in</div>
              </Button>
            </div>
            <div style={{ gridColumnEnd: 'span 6' }}>
              <Paper className={classes.paper}>
                <Typography variant="h6">Easy to play</Typography>
              </Paper>
              <Paper className={classes.paper}>
                <Typography variant="h6">Join as Guest</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="roomId"
                  placeholder="Enter room code"
                  name="roomId"
                  autoComplete="roomId"
                  type="number"
                  className={classes.input}
                />
                <IconButton
                  type="submit"
                  aria-label="Forward"
                  className={classes.icon}
                >
                  <Forward />
                </IconButton>
              </Paper>
            </div>
          </div>
        </Grid>
      </Grid>
      <div></div>
      <div></div>
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
}

export default Home;
