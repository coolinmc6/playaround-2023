"use client"

import React from 'react';
import PageContent from '@/app/components/PageContent';
import { useGeolocation } from '@/app/hooks/advanced/useGeolocation';
import Button from '@/core/Button';

const GeoLocation = () => {
  const { location, getLocation } = useGeolocation();

  
  // console.log(location)
  const handleLocation = () => {
    console.log('clicked')
    getLocation()
  }
  return (
    <PageContent>
      <PageContent.Header>GeoLocation</PageContent.Header>
      <div>
        Request Location: <Button onClick={handleLocation}>Get Location</Button>
      </div>
      <div>
        {location ? (
          <div>
            <div>Latitude: {location.latitude}</div>
            <div>Longitude: {location.longitude}</div>
            <div>Accuracy: {location.accuracy}</div>
          </div>
        ) : (
          <div>No location available</div>
        )}
      </div>
    </PageContent>
  )
}

export default GeoLocation;
