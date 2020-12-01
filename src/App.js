import React, { useState, useRef } from 'react'
//import styles
import './styles/styles.scss'
//import Components
import Player from './components/PlayerControls'
import Song from './components/Song'
import Library from './components/Library'
import Nav from './components/Nav'
//import Data
import data from './data'

const App = () => {
    const [songs, setSongs] = useState(data())
    const [currentSong, setCurrentSong] = useState(songs[0])
    const [isPlaying, setIsPlaying] = useState(false)
    const [autoplay, setAutoplay] = useState(false)
    const audioRef = useRef(null)
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    })
    const [libraryStatus, setLibraryStatus] = useState(false)

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime
        const duration = e.target.duration
        const roundedCurrent = Math.round(current)
        const roundedDuration = Math.round(duration)
        const timePassed = Math.round((100 / roundedDuration) * roundedCurrent)

        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
            animationPercentage: timePassed,
        })
    }

    const activeSongFunc = songs.map((targetSong) => {
        return {
            ...targetSong,
            active: targetSong.id === currentSong.id,
        }
    })

    const songEndHandler = async () => {
        const currentIndex = songs.findIndex(
            (song) => song.id == currentSong.id
        )
        await setCurrentSong(songs[(currentIndex + 1) % songs.length])

        if (autoplay && isPlaying) {
            audioRef.current.play()
        }
    }

    return (
        <div className={`App ${libraryStatus ? 'library-active' : null}`}>
            <Nav
                autoplay={autoplay}
                setAutoplay={setAutoplay}
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Library
                setSongs={setSongs}
                autoplay={autoplay}
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                setIsPlaying={setIsPlaying}
                libraryStatus={libraryStatus}
                activeSongFunc={activeSongFunc}
            />
            <Song currentSong={currentSong} />
            <Player
                setCurrentSong={setCurrentSong}
                setSongs={setSongs}
                songs={songs}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
                activeSongFunc={activeSongFunc}
                autoplay={autoplay}
            />
            <audio
                ref={audioRef}
                onTimeUpdate={timeUpdateHandler}
                src={currentSong.audio}
                onLoadedMetadata={timeUpdateHandler}
                onEnded={songEndHandler}
            >
                <track
                    default
                    kind="captions"
                    srcLang="en"
                    src={currentSong.audio}
                />
            </audio>
        </div>
    )
}

export default App
