import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
        container_horizontal:{
            display: 'grid',
            gridTemplateColumns: "30% 40% 30%",
            marginTop: '50px'
        }, container_vertical:{
            display: 'grid',
            padding: '10px'
        }, select_menu:{
            display: 'grid',
            gridTemplateColumns: "40% 60%",
            marginBottom: '15px'
        }, updateButton:{
            backgroundColor: 'rgb(63, 81, 181)',
            color: "white",
            marginTop: '15px'
    }
    }));