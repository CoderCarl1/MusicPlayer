import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
    autoplay,
    songInfo,
    songs,
    setSongInfo,
    audioRef,
    isPlaying,
    setIsPlaying,
    currentSong,
    setCurrentSong,
    setSongs,
    activeSongFunc,
}) => {
    const playSongHandler = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play()
        setIsPlaying(!isPlaying)
    }

    const skipTrackHandler = async (direction) => {
        const currentIndex = songs.findIndex(
            (song) => song.id == currentSong.id
        )
        if (direction === 'forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            setSongs(activeSongFunc)
            if (autoplay) {
                audioRef.current.play()
            }
        } else {
            if ((currentIndex - 1) % songs.length === -1) {
                await setCurrentSong(songs[songs.length - 1])
                setSongs(activeSongFunc)
                if (autoplay) {
                    audioRef.current.play()
                }
                return
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            setSongs(activeSongFunc)
            if (autoplay) {
                audioRef.current.play()
            }
        }
    }

    const formatTime = (time) => {
        return (
            Math.floor(time / 60) +
            ':' +
            ('0' + Math.floor(time % 60)).slice(-2)
        )
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    //styles for the track button
    const trackAnimStyle = {
        transform: `translateX(${songInfo.animationPercentage}%)`,
    }

    return (
        <div className="player flex-col">
            <div className="time-control flex">
                <p>{formatTime(songInfo.currentTime)}</p>
                <div
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
                    }}
                    className="track"
                >
                    <input
                        onChange={dragHandler}
                        min={0}
                        max={
                            songInfo.duration
                                ? formatTime(songInfo.duration)
                                : '0:00'
                        }
                        type="range"
                        value={songInfo.currentTime}
                    />
                    <div style={trackAnimStyle} className="animate-track"></div>
                </div>
                <p>
                    {songInfo.duration ? formatTime(songInfo.duration) : '0:00'}
                </p>
            </div>
            <div className="play-control flex">
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('back')}
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />

                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="pause"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />

                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('forward')}
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
        </div>
    )
}

export default Player
