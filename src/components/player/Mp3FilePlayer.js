import React, {Component} from "react";

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



export default class Mp3FilePlayer extends Component {

    render() {
        const adres = "http://localhost:8888/stayAwhileAndListen/audio/getById/" + this.props.children.quoteId;
        const trackName = this.props.children.quoteName

        return (
            <div className={"text-dark center row"}>
                <div className="col-md-6 col-md-offset-3">
                    <AudioPlayer
                        style={{width: '479px'}}
                        showJumpControls={false}
                        header={trackName}
                        src={adres}
                    />
                </div>
            </div>
        );
    }
}
