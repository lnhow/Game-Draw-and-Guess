import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Select,
  TextField,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useStyles from './styles';
import CategoryApi from '../../../api/categoryApi';
import RoomApi from '../../../api/roomApi';
import { useSelector } from 'react-redux';
import Alert from '../../../common/alert';
import { useHistory } from 'react-router-dom';
import { ConsoleLog } from '../../../helpers/functions';

const validationSchema = yup.object({
  roomName: yup
    .string('Enter the room name')
    .min(6, 'Room name must contain more than 6 characters')
    .required('Room name is required'),
  category: yup.string('Select category').required('Category is required'),
  timePerRound: yup
    .string('Select time per round')
    .required('Time per round is required'),
});

const timePerRoundOptions = [30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180];
const DEFAULT_TIME_PER_ROUND = timePerRoundOptions[2];
//const maxPlayerOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; //Feature disabled

function RoomCreate(props) {
  const [categories, setCategories] = useState([]);
  const [displayAlert, setDisplayAlert] = useState('');
  const history = useHistory();
  const classes = useStyles();
  const User = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      roomName: '',
      maxPlayer: -1, //Feature disabled
      timePerRound: DEFAULT_TIME_PER_ROUND,
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const dataSubmit = {
        ...values,
        hostUserId: User.id,
      };
      try {
        const reponses = await RoomApi.create(dataSubmit);
        setDisplayAlert(
          <Alert
            severity="success"
            onClose={() => handleCloseAlert(reponses.roomId)}
          >
            This is a success-<strong>Click close to enter the game</strong>
          </Alert>,
        );
      } catch (error) {
        ConsoleLog(error);
        setDisplayAlert(<Alert severity="error">{error.message}</Alert>);
      }
    },
  });

  const handleCloseAlert = (roomId) => {
    history.push(`/room/${roomId}`);
  };

  useEffect(() => {
    async function getCategories() {
      try {
        const reponses = await CategoryApi.get();
        setCategories(reponses.categories);
      } catch (error) {
        ConsoleLog(error);
      }
    }

    getCategories();
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      {displayAlert}
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new room
        </Typography>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Box className={classes.fieldBox}>
            <TextField
              fullWidth
              id="roomName"
              name="roomName"
              label="Room Name (Min. 6 characters)"
              variant="outlined"
              value={formik.values.roomName}
              onChange={formik.handleChange}
              error={formik.touched.roomName && Boolean(formik.errors.roomName)}
              helperText={formik.touched.roomName && formik.errors.roomName}
            />
          </Box>
          <Box className={classes.fieldBox}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-category">Room Category</InputLabel>
              <Select
                fullWidth
                id="category"
                name="category"
                label="Room Category"
                labelId="select-category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Feature Disabled
          <Box className={classes.fieldBox}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-max-player">Max Player</InputLabel>
              <Select
                fullWidth
                id="max-player"
                name="maxPlayer"
                label="Max Player"
                labelId="select-max-player"
                value={formik.values.maxPlayer}
                onChange={formik.handleChange}
                error={
                  formik.touched.maxPlayer && Boolean(formik.errors.maxPlayer)
                }
              >
                {maxPlayerOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box> */}
          <Box className={classes.fieldBox}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-time-per-round">
                Time per round (in seconds)
              </InputLabel>
              <Select
                fullWidth
                id="time-per-round"
                name="timePerRound"
                label="Time per round (in seconds)"
                labelId="select-time=per-round"
                value={formik.values.timePerRound}
                onChange={formik.handleChange}
                error={
                  formik.touched.timePerRound &&
                  Boolean(formik.errors.timePerRound)
                }
              >
                {timePerRoundOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box className={classes.fieldBox}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Create
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

RoomCreate.propTypes = {};

export default RoomCreate;
