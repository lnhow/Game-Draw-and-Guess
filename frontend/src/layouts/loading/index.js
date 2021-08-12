import { Container, Grid, Box } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

function LoadingPage({ text }) {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress color="secondary" />
            <p>{text ? text : 'Loading'}</p>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoadingPage;
