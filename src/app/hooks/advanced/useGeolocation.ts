/**
 * This hook is used to get the user's current location.
 */

import React, { useState } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | undefined>();

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
