
import React from "react";
import Link from "@material-ui/core/Link"
import Button from "@material-ui/core/Button";


export default function CustomIconButton(props){
    const {to, ...rest} = props;
    return (<Link href={to} underline='none'><Button variant="contained" {...props}/></Link>)
}
