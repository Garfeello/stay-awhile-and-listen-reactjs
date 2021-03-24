import React, {Component} from "react";

import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import "./../../App.scss";

export default class Mp3FilePlayer extends Component {

    render() {
        const adres = "http://localhost:8888/stayAwhileAndListen/audio/getById/" + this.props.children.quoteId;
        const trackName = this.props.children.quoteName

        return (
            <AudioPlayer
                showJumpControls={false}
                header={trackName}
                src={adres}
                autoPlay={false}
            />
        );
    }
}
