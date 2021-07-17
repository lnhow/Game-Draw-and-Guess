import { Container, Grid } from '@material-ui/core';

function Home() {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <h1>Welcome to Draw&Guess !</h1>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
