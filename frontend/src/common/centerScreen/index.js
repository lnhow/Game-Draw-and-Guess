import { Box } from '@material-ui/core';

function CenterScreen({ children }) {
  return (
    <Box
      display="flex"
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  );
}

export default CenterScreen;
