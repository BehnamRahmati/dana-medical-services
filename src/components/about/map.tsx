'use client'

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'

// Define map container style
const containerStyle = {
	width: '100%',
	height: '400px', // Adjust height as needed
	borderRadius: '1rem', // Optional: match styling
}

// Define center coordinates (replace with your actual location)
const center = {
	lat: 35.7219, // Example: Tehran latitude
	lng: 51.3347, // Example: Tehran longitude
}

// Define map options
const mapOptions = {
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: false,
	streetViewControl: false,
	rotateControl: false,
	fullscreenControl: false,
}

function MapComponent() {
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Use environment variable
	})

	const mapRef = React.useRef<google.maps.Map | null>(null)

	const onLoad = React.useCallback(function callback(map: google.maps.Map) {
		// You can optionally store the map instance or perform actions on load
		mapRef.current = map
		// Example: Set bounds or other initial settings
		// const bounds = new window.google.maps.LatLngBounds(center);
		// map.fitBounds(bounds);
	}, [])

	const onUnmount = React.useCallback(function callback() {
		mapRef.current = null
	}, [])

	if (loadError) {
		console.error('Google Maps loading error:', loadError)
		return <div>Error loading map. Please check the API key and configuration.</div>
	}

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={14} // Adjust initial zoom level
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={mapOptions}
		>
			{/* Child components, like markers */}
			<MarkerF
				position={center}
				// Optional: Add custom icon or label
				// label="Dena Medical Services"
			/>
		</GoogleMap>
	) : (
		<div>Loading Map...</div>
	)
}

export default React.memo(MapComponent)
