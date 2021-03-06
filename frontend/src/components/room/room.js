import {
  Container,
  Grid,
  CssBaseline,
  CircularProgress,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { FuncButton } from '../../common/Button.js';
import Footer from '../../components/footer/index.js';
import RoomListItem from './roomListItem';

import { useState, useEffect } from 'react';

import { withStyles } from '@material-ui/core/styles';
import style from './style';
import SearchBar from 'material-ui-search-bar';
import AlertDialogSlide from '../../common/dialog/dialog.js';
import { ConsoleLog } from '../../helpers/functions.js';
import { useHistory } from 'react-router-dom';
import RoomApi from '../../api/roomApi';
import { useSelector, useDispatch } from 'react-redux';
import UserApi from '../../api/userApi.js';
import { updateUser } from '../../features/User/userSlice';
import jwt from 'jsonwebtoken';
import GuessJoinRoomModal from '../../common/modal/userJoinModal';
import CenterScreen from '../../common/centerScreen/index.js';
import { WAITING, PLAYING } from '../../common/constant/index';

function Rooms({ classes }) {
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [idRoom, setIdRoom] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const history = useHistory();
  const User = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isAlertAnonymousUser, setIsAlertAnonymousUser] = useState(false);
  const [errorJoinAnonymousUser, setErrorJoinAnonymousUser] = useState('');

  useEffect(() => {
    async function getRooms() {
      try {
        const reponses = await RoomApi.get();
        setData(reponses.rooms);
      } catch (error) {
        ConsoleLog(error.message);
      }
    }

    getRooms();
  }, []);

  const requestSearch = (searchedVal) => {
    if (!searchedVal) {
      async function getRooms() {
        try {
          const reponses = await RoomApi.get();
          setData(reponses.rooms);
        } catch (error) {
          ConsoleLog(error.message);
        }
      }

      getRooms();
    } else {
      setIsSearching(true);
      const filteredRows = data.filter((row) => {
        return row.roomName.toLowerCase().includes(searchedVal.toLowerCase());
      });
      ConsoleLog('filtered: ', filteredRows);
      setData(filteredRows);
    }
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearched('');
    requestSearch(searched);
  };

  const handleClickRoom = async (event) => {
    setIdRoom(event.currentTarget.attributes?.idRoom?.value);
    if (User.isLogin) return setIsOpenAlert(true);

    return handleOpenAlertAnonymousUser();
  };

  const handleOpenAlertAnonymousUser = () => setIsAlertAnonymousUser(true);
  const handleCloseAlertAnonymousUser = () => setIsAlertAnonymousUser(false);

  const handleJoinAlertAnonymousUser = async (username) => {
    try {
      const reponses = await UserApi.getAnonymousUser({ username });
      const infoUser = jwt.decode(reponses.token, { complete: true });
      dispatch(
        updateUser({
          isLogin: false,
          id: infoUser.payload.userId,
          username: infoUser.payload.username,
          isToken: true,
        }),
      );
      await localStorage.setItem('user', reponses.token);
      await localStorage.setItem('isLogin', false);
      if (errorJoinAnonymousUser) setErrorJoinAnonymousUser('');
      history.push(`/room/${idRoom}`);
    } catch (error) {
      const errorMessage = error?.['response']?.data?.message;
      if (errorMessage) setErrorJoinAnonymousUser(errorMessage);
      ConsoleLog({ error });
    }
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9}>
              <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FuncButton link="/room/create" text="New room" name="room" />
            </Grid>
          </Grid>
        </Toolbar>
        <GuessJoinRoomModal
          isOpen={isAlertAnonymousUser}
          closeAlert={handleCloseAlertAnonymousUser}
          join={handleJoinAlertAnonymousUser}
          errorMessage={errorJoinAnonymousUser}
        />
        <div className={classes.grid}>
          <Scrollbars
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                // style={{ display: 'none' }}
                className="track-horizontal"
              />
            )}
          >
            <AlertDialogSlide
              isOpen={isOpenAlert}
              setIsOpen={() => setIsOpenAlert(false)}
              handleJoin={() => history.push(`/room/${idRoom}`)}
            />
            {data && data.length > 0 ? (
              <Grid container spacing={3}>
                {data.map((data, key) => {
                  return (
                    (data.roomStatus === WAITING ||
                      data.roomStatus === WAITING) && (
                      <Grid
                        item
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        key={key}
                        idRoom={data._id}
                        onClick={handleClickRoom}
                      >
                        <RoomListItem
                          key={key}
                          currentPlayer={data.currentPlayer}
                          maxPlayer={data.maxPlayer}
                          timePerRound={data.timePerRound}
                          roomName={data.roomName}
                          roomId={data._id}
                          categoryName={data.categoryName}
                          roomStatus={data.roomStatus}
                        />
                      </Grid>
                    )
                  );
                })}
              </Grid>
            ) : (
              <CenterScreen>
                {isSearching ? (
                  <Typography>Not found</Typography>
                ) : (
                  <CircularProgress color="secondary" />
                )}
              </CenterScreen>
            )}

            {/* <ImageList cols={4} rowHeight={200} gap={24}>
              {data.map((data, key) => {
                return (
                  <ImageListItem
                    key={key}
                    idRoom={data._id}
                    onClick={handleClickRoom}
                  >
                    <Room
                      key={key}
                      currentPlayer={data.currentPlayer}
                      maxPlayer={data.maxPlayer}
                      roomName={data.roomName}
                      roomId={data._id}
                      categoryName={data.categoryName}
                    />
                  </ImageListItem>
                );
              })}
            </ImageList> */}
          </Scrollbars>
        </div>
      </div>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default withStyles(style)(Rooms);
