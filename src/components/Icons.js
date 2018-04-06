import React from 'react';

const Icons = React.createClass( {

	render() {

		switch ( this.props.icon ) {

			case 'search':
				return <svg width="33" height="32" className="icon icon-search" viewBox="0 0 33 32" xmlns="http://www.w3.org/2000/svg"><title>Search</title><path d="M12.338 22.413c-5.765 0-10.44-4.593-10.44-10.267 0-5.674 4.675-10.276 10.44-10.276 5.766 0 10.441 4.602 10.441 10.276 0 5.674-4.675 10.267-10.44 10.267zm20.376 7.15l-11.237-9.286c1.981-2.155 3.2-4.996 3.2-8.131C24.677 5.436 19.153 0 12.338 0 5.524 0 0 5.436 0 12.146c0 6.7 5.524 12.136 12.338 12.136 2.945 0 5.645-1.017 7.766-2.713l11.268 9.314a.956.956 0 0 0 1.342 0c.371-.358.371-.037 0-.404v-.916z" fill="#FFF" fillRule="evenodd"/></svg>

			case 'link':
				return <svg width="20" height="20" className="icon icon-link" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Link</title><path d="M11.91 15.28c.147 0 .292-.004.436-.012-.07.078-.142.155-.218.23l-2.697 2.698a5.393 5.393 0 1 1-7.627-7.628l2.697-2.696a5.397 5.397 0 0 1 6.139-1.054 5.386 5.386 0 0 1 1.488 1.053c.446.446.797.95 1.054 1.489a1.791 1.791 0 0 1-1.8.449 3.609 3.609 0 0 0-1.191-1.192 3.597 3.597 0 0 0-4.419.526l-.81.81-1.886 1.887a3.596 3.596 0 0 0 5.084 5.085l1.887-1.887a7.213 7.213 0 0 0 1.863.243zm6.51-13.7a5.393 5.393 0 0 0-7.627 0L8.097 4.276a5.541 5.541 0 0 0-.219.231 7.198 7.198 0 0 1 2.3.231l1.886-1.887a3.596 3.596 0 0 1 5.085 5.085l-1.887 1.887-.81.81a3.598 3.598 0 0 1-5.61-.666 1.792 1.792 0 0 0-1.8.449 5.393 5.393 0 0 0 1.054 1.488 5.397 5.397 0 0 0 7.627 0l2.697-2.697a5.393 5.393 0 0 0 0-7.627z" fill="#7F7F7F" fillRule="evenodd"/></svg>

			case 'audio':
				return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="icon icon-audio" viewBox="0 0 16 16"><title>Audio</title><path d="M2 6v4h3l3 3V3L5 6H2zm8.121-.122l-.707.707a1.998 1.998 0 0 1 0 2.829l.707.707A2.987 2.987 0 0 0 11 8c0-.829-.336-1.579-.879-2.122zm1.415-1.414l-.707.708A3.985 3.985 0 0 1 12 8a3.987 3.987 0 0 1-1.171 2.829l.707.707A4.985 4.985 0 0 0 13 8c0-1.381-.56-2.631-1.464-3.536z" fill="#271d62"/></svg>

			case 'play':
			case 'video':
				return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="icon icon-play" viewBox="0 0 16 16"><title>Play</title><path fill="#0e5c13" d="M4 3v10l8-5z"/></svg>

			case 'pause':
				return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="icon icon-pause" viewBox="0 0 20 20"><title>Pause</title><path d="M5 16V4h3v12H5zm7-12h3v12h-3V4z"/></svg>

			case 'close':
				return <svg width="15" height="15" className="icon icon-close" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg"><title>Close</title><path d="M15 1l-1-1-6.5 6.5L1 0 0 1l6.5 6.5L0 14l1 1 6.5-6.5L14 15l1-1-6.5-6.5z" fill="#FFF" fillRule="evenodd"/></svg>

			case 'zoom':
				return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="icon icon-zoom" viewBox="0 0 16 16"><title>Zoom</title><path d="M7 4H6v2H4v1h2v2h1V7h2V6H7V4zm3.134 5.134A4.46 4.46 0 0 0 11 6.5 4.5 4.5 0 1 0 6.5 11a4.46 4.46 0 0 0 2.634-.866L13 14l1-1-3.866-3.866zM6.5 10a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" fill="#fff"/></svg>

			default:
				return null;

		}

	}

} );

export default Icons;
