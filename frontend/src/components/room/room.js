import {
  Container,
  Grid,
  CssBaseline,
  ImageList,
  ImageListItem,
} from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import { FuncButton } from '../../common/Button.js';
import Footer from '../../components/footer/index.js';
import Room from './roomDetail.js';
import { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import SearchBar from 'material-ui-search-bar';
import AlertDialogSlide from '../../common/dialog/dialog.js';
import { useHistory } from 'react-router-dom';
import RoomApi from '../../api/roomApi';

function Rooms({ classes }) {
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState('');
  const [idRoom, setIdRoom] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    async function getRooms() {
      try {
        const reponses = await RoomApi.get();
        setData(reponses.rooms);
      } catch (error) {
        console.log(error.message);
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
          console.log(error.message);
        }
      }

      getRooms();
    } else {
      const filteredRows = data.filter((row) => {
        return row.roomName.toLowerCase().includes(searchedVal.toLowerCase());
      });
      console.log('filtered: ', filteredRows);
      setData(filteredRows);
    }
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
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />

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
            <ImageList cols={4} rowHeight={200} gap={24}>
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
            </ImageList>
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
