import {
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Input,
} from '@material-ui/core';
import { FuncButton } from '../../common/Button.js';
// import Input from '../../components/auth/input.js';
import Footer from '../../components/footer/index.js';
import AvarModal from '../../common/modal/avarModal.js';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3, 0),
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
    marginLeft: theme.spacing(35),
    marginRight: theme.spacing(20),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    alignItems: 'center',
    justifyItems: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
  },
  welcome: {
    fontFamily: '"Gorditas", cursive',
    marginBottom: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  description: {
    fontFamily: '"Fredoka One", cursive',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  icon: {
    color: 'white',
    padding: '0px 5px',
  },
  input: {
    width: '90%',
  },
  divider: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: '4px',
  },
  span: {
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 2px 0 black, 0 -1px black',
  },
  text: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: '22px',
    color: '#616161',
    textAlign: 'initial',
  },
  username: {
    marginLeft: theme.spacing(2),
    border: '3px solid #c1c1c1',
    padding: theme.spacing(1),
  },
  table: {
    width: 'max-content',
  },
}));

const intro = {
  color: '#FFA500',
  weight: '400',
  fontSize: 30,
  textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
};

const gameName = {
  fontSize: '40px',
  color: '#800080',
};

function Profile() {
  const classes = useStyles();
  const User = useSelector((state) => state.user);

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div>
        <Typography variant="h5" className={classes.welcome} style={gameName}>
          You've logged in!
        </Typography>
        <Typography variant="h6" className={classes.description} style={intro}>
          {User.username}
        </Typography>
      </div>

      <div className={classes.container}>
        <Grid>
          <img src={User.avatar} alt="avatar" />
          <AvarModal />
        </Grid>
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    username
                  </TableCell>
                  <TableCell align="left">{User.username}</TableCell>
                  <TableCell>
                    <EditIcon />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    email
                  </TableCell>
                  <TableCell align="left">
                    <Input
                      id="roomId"
                      placeholder={User.username}
                      disabled
                      value="example@gmai.com"
                    />
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    password
                  </TableCell>
                  <TableCell align="left">
                    <Input
                      id="roomId"
                      placeholder={User.password}
                      disabled
                      value="****"
                    />
                  </TableCell>
                  <TableCell>
                    <EditIcon />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <FuncButton
            link="/profile/edit"
            text="edit"
            bgcolor="#F97645"
            name="edit"
          ></FuncButton>
        </Grid>
      </div>

      <Grid item xs="12">
        <Footer />
      </Grid>
    </Container>
  );
}

export default Profile;
