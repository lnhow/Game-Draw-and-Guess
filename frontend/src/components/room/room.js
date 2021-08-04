import {
  Container,
  Grid,
  GridList,
  Typography,
  CssBaseline,
  GridListTile,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { FuncButton } from '../../common/Button.js';
import Footer from '../../components/footer/index.js';
import Room from './roomDetail.js';
import { useState, useEffect } from 'react';
import { roomData } from './roomData.js';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import SearchBar from 'material-ui-search-bar';
import AlertDialogSlide from '../../common/dialog/dialog.js';
import { useHistory } from 'react-router-dom';

const gameName = {
  fontSize: '40px',
  color: 'black',
};

// const back = {
//   transform: 'rotate(180deg)',
//   color: '#FFE203',
// };

function Rooms({ classes }) {
  const [data, setData] = useState(roomData);
  const [searched, setSearched] = useState('');
  const [idRoom, setIdRoom] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const history = useHistory();

  const getData = () => {
    fetch('roomData.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const requestSearch = (searchedVal) => {
    const filteredRows = roomData.filter((row) => {
      return row.roomName.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const cancelSearch = () => {
    setSearched('');
    requestSearch(searched);
  };

  const handleClickRoom = (event) => {
    setIdRoom(event.currentTarget.attributes?.idRoom?.value);
    setIsOpenAlert(true);
  };

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      <div>
        <Typography variant="h5" className={classes.page} style={gameName}>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
        </Typography>

        <div className={classes.grid}>
          <Scrollbars
            renderTrackHorizontal={(props) => (
              <div
                {...props}
                style={{ display: 'none' }}
                className="track-horizontal"
              />
            )}
          >
            <AlertDialogSlide
              isOpen={isOpenAlert}
              setIsOpen={() => setIsOpenAlert(false)}
              handleJoin={() => history.push(`/room/${idRoom}`)}
            />
            <GridList cols={4} cellHeight={200} spacing={10}>
              {data.map((data, key) => {
                return (
                  <GridListTile
                    key={key}
                    idRoom={data.roomId}
                    onClick={handleClickRoom}
                  >
                    <Room
                      key={key}
                      currentPlayer={data.currentPlayer}
                      maxPlayer={data.maxPlayer}
                      language={data.language}
                      point={data.point}
                      roomName={data.roomName}
                      roomId={data.roomId}
                      value={'123' + (Math.random() * 10) / 100}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </Scrollbars>
        </div>

        <div className={classes.center}>
          <Grid item>
            <FuncButton
              link="/room/create"
              text="New room"
              name="room"
            ></FuncButton>
          </Grid>
        </div>
      </div>
      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default withStyles(style)(Rooms);
