import logo from './logo.svg';
import './App.css';
import React from 'react'
import ReactPlayer from 'react-player/youtube'
import ReactAudioPlayer from 'react-audio-player';


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=SZ6eYHIcLOs'
                />
                <a>aa</a>
                {/*<ReactAudioPlayer*/}
                {/*    src="http://localhost:8888/stayAwhileAndListen/character/test2"*/}
                {/*    autoPlay={true}*/}
                {/*    controls*/}
                {/*/>*/}
            </header>
        </div>
    );
}

export default App;
