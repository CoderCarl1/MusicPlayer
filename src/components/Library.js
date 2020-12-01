import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({
    autoplay,
    setIsPlaying,
    audioRef,
    songs,
    setSongs,
    setCurrentSong,
    libraryStatus,
    activeSongFunc,
}) => {
    return (
        <div
            className={`library ${libraryStatus ? 'active-library' : ''}`}
            role="menu"
        >
            <h2>Library</h2>
            <ul className="library-songs flex-col">
                {songs.map((song) => (
                    <LibrarySong
                        key={song.id.toString()}
                        songs={songs}
                        setSongs={setSongs}
                        song={song}
                        audioRef={audioRef}
                        setCurrentSong={setCurrentSong}
                        setIsPlaying={setIsPlaying}
                        activeSongFunc={activeSongFunc}
                        autoplay={autoplay}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Library
