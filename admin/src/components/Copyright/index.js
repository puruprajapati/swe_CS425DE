import { Link, Typography } from '@mui/material';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://miu.edu/">
        MIU AirBnB System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}