import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ setLibraryStatus, libraryStatus, setAutoplay, autoplay }) => {
    const handleAutoPlay = () => {
        setAutoplay(!autoplay)
    }

    return (
        <nav className="flex">
            <div>
                <h1>Waves</h1>
                <button onClick={() => setLibraryStatus(!libraryStatus)}>
                    Library
                    <FontAwesomeIcon icon={faMusic} />
                </button>
            </div>
            <label className="autoplay flex" name="toggle-autoplay">
                <p>AutoPlay:</p>
                <input
                    type="checkbox"
                    onClick={handleAutoPlay}
                    value={autoplay}
                />
            </label>
        </nav>
    )
}

export default Nav
