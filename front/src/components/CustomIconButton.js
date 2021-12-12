import {IconButton} from "@material-ui/core";
import React from "react";
import Link from "@material-ui/core/Link"


export default function CustomIconButton(props){
    const {to, ...rest} = props;
    return (<Link href={to} underline='none'><IconButton {...props}/></Link>)
}
