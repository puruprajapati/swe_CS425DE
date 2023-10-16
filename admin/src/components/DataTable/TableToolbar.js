import { Toolbar, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const TableToolbar = (props) => {
  const { title } = props;

  if (!title) {
    return;
  }
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  title: PropTypes.string,
};

export default TableToolbar;