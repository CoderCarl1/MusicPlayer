import React from 'react'

const LibrarySong = ({
    autoplay,
    setIsPlaying,
    isPlaying,
    audioRef,
    song,
    setCurrentSong,
    setSongs,
    activeSongFunc,
}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song)
        setIsPlaying(true)

        //add active className to song
        setSongs(activeSongFunc)
        if (autoplay) {
            audioRef.current.play()
        }
    }
    const handleKeyPress = () => {
        return
    }
    return (
        <li
            onKeyPress={handleKeyPress}
            onClick={songSelectHandler}
            ariarole="song selector"
            className={`library-song flex ${song.active ? 'selected' : ''}`}
            role="menuitem"
        >
            <img
                src={song.cover}
                alt={song.name}
                className={`${isPlaying ? 'cover-rotate' : null}`}
            />
            <div className="song-description flex-col">
                <h4>{song.name}</h4>
                <p>{song.artist}</p>
            </div>
        </li>
    )
}

export default LibrarySong
