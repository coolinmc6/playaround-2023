/**
 * This hook is used to get the user's current location.
 */
// https://www.youtube.com/watch?v=J4PDxTO3oj0
import React, { useState } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | undefined>();

  // navigator.permissions.query({ name: 'geolocation' }).then((result) => {})

  const onSuccess = (location: GeolocationPosition) => {
    setLocation(location.coords);
  };

  const onError = (error: GeolocationPositionError) => {
    setLocation(undefined);
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation(undefined);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  return { location, getLocation };
}
