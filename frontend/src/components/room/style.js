const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
      marginBottom: '40px',
      marginTop: '30px',
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
      marginLeft: theme.spacing(40),
      marginRight: theme.spacing(20),
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      whiteSpace: 'nowrap',
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(10),
    },
    page: {
      fontFamily: '"Gorditas", cursive',
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      color: 'black',
      whiteSpace: 'nowrap',
    },
    description: {
      fontFamily: '"Fredoka One", cursive',
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    icon: {
      color: 'white',
      padding: '0px 5px',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    input: {
      width: '90%',
    },
    divider: {
      marginLeft: theme.spacing(5),
      width: '4px',
    },
    span: {
      color: 'white',
      textShadow: '-1px 0 black, 0 1px black, 2px 0 black, 0 -1px black',
    },
    text: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '22px',
      color: '#616161',
      textAlign: 'initial',
    },
    center: {
      display: 'table',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    margin: {
      marginRight: '40px',
      marginLeft: '40px',
    },
    search: {
      width: '30%',
      marginLeft: '550px',
      backgroundColor: 'white',
    },
    grid: {
      height: '450px',
      backgroundColor: '#FEEB75',
      padding: '20px 50px',
      borderRadius: '20px',
      marginTop: '20px',
      marginBottom: '20px',
    },
  });

export default useStyles