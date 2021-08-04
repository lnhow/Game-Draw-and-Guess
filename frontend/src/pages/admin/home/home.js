import {
  Container,
  Grid,
  CssBaseline,
} from '@material-ui/core';

import Footer from '../../../components/footer/index.js';

import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import Style from './style';
import Table from '../../../common/table/table'
import RoomApi from '../../../api/roomApi'
import CategoryApi from '../../../api/categoryApi'





function Home({classes}) {

  const [rooms,setRooms] = useState([])
  const [categories,setCategories] = useState([])
  const [lookupCategory,setLookupCategory] = useState({})

  useEffect(()=>{
    async function getRooms(){
      try {
        const reponses = await RoomApi.get()
        setRooms(reponses.rooms)
        console.log(reponses.rooms)
      } catch (error) {
        console.log(error.message)
      }
      
    }

    async function getCategories(){
      try {
        const reponses = await CategoryApi.get()
        setCategories(reponses.categories)
        console.log(reponses.categories)
      } catch (error) {
        console.log(error.message)
      }
      
    }
    getCategories()
    getRooms()

    const lookupCategory = categories.reduce((acc, category) =>{ 
      const lookup = {...acc,[category.id]:category.name}
      return lookup
    },{})
    setLookupCategory(lookupCategory)
  },[categories])

  return (
    <Container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={12}>
        <Table datas={rooms} lookupCategory={lookupCategory} />
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Container>
  );
}

export default withStyles(Style)(Home);
