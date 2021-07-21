import React from 'react';
import { Typography, Link } from '@material-ui/core';

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://github.com/cvn-intern/Game-Draw-and-Guess.git"
      >
        Chin Muoi Ghi - Internship
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Footer;
