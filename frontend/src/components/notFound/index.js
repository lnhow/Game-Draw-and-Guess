import { Container, Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

function NotFound() {
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
          <Box>
            <h1 className="errorCode">404</h1>
            <h2>Not Found</h2>
            <Link to="/">Back to Home</Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default NotFound;
