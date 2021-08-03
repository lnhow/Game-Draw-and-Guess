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
import Input from '../../common/inputVer1/input';
import Footer from '../../components/footer/index.js';
import Room from './roomDetail.js';
import { useState, useEffect } from 'react';
import { roomData } from './roomData.js';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import SearchBar from 'material-ui-search-bar';

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
          
            <GridList cols={4} cellHeight={200} spacing={10}>
              {data.map((data, key) => {
                return (
                  
                  <GridListTile key={key} idRoom={'1234'} onClick={(e)=>console.log(e)}>
                    <Room
                      key={key}
                      currentPlayer={data.currentPlayer}
                      maxPlayer={data.maxPlayer}
                      language={data.language}
                      point={data.point}
                      roomName={data.roomName}
                      roomId={data.roomId}

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
            <FuncButton
              link="/room/:id"
              text="Play"
              bgcolor="#028a0f"
              name="esport"
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

// function NumberInput({ id, name, classes }) {
//   return <Input name="search" placeholder="Search room" />;
// }

export default withStyles(style)(Rooms);
