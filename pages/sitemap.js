import React, { Component } from "react";
import {SERVER_URL} from '../Config/index';

export default class Robots extends Component {
    static async getInitialProps({ res }) {
        if(res) {
            const response = await fetch(SERVER_URL + "/Public/Xml/sitemap.xml");
            const text = await response.text();
            res.setHeader("Content-Type", "text/xml");
            res.write(text);
            res.end();
        }
    }
}