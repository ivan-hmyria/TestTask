import React, {useState} from "react";
import NavigationBar from "./NavigationBar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";


export default function Main(props){
    return(
        <Container component="main">
            <NavigationBar />

        </Container>
    )
}