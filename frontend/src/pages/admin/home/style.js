const useStyles = (theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3, 0),
    },
    navbarTitle: {
      textDecoration: 'none',
      color: 'blue',
      '&:hover': {
        textDecoration: 'none',
      },
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
      width: '300px',
    },
    welcome: {
      fontFamily: '"Gorditas", cursive',
      marginBottom: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
  });

export default useStyles