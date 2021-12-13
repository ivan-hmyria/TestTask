import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
      root: {
        fontSize: '400pt',
      },
      table: {
        fontSize: '200pt',
      },
    filter_container: {
        display: "grid",
        gridTemplateColumns: "40% 20% 20% 15%"
    },
    reset_button: {
          color: "white",
        fontSize: "20p",
        padding: '15px',
        margin: '15px',
        background: 'rgb(63, 81, 181)'
    },
    date_picker: {
          margin: '15px'
    }
    }));