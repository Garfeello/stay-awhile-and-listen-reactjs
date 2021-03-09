import React, {Component} from "react";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export default class Mp3FilePlayer extends Component {


    render() {
        const adres = "http://localhost:8888/stayAwhileAndListen/audio/getById/" + this.props.children.quoteId;
        const trackName = this.props.children.quoteName

        return (
            <div>
                <AudioPlayer
                    style={{width: '400px'}}
                    showJumpControls={false}
                    header={trackName}
                    src={adres}
                    onPlay={e => console.log("onPlay")}
                />
            </div>
        );
    }
}
