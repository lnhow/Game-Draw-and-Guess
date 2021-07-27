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
import { getCategories } from '../../../helpers/api';

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
const maxPlayerOptions = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

function RoomCreate(props) {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      roomName: '',
      maxPlayer: 6,
      timePerRound: 30,
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
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
                  <MenuItem key={category._id} value={category._id}>
                    {category.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
          </Box>
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
