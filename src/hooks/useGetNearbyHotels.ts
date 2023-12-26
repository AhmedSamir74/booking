import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import GetLocation from 'react-native-get-location';

const radius = 50 * 1000;
export const useGetNearbyHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location?.latitude},${location?.longitude}&radius=${radius}&type=hotels&key=${Config.GOOGLE_PLACES_API_KEY}`;
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(res => {
            setHotels(
              res.results.map((googlePlace: any) => ({
                id: googlePlace.place_id,
                name: googlePlace.name,
                address: googlePlace.vicinity,
                image: googlePlace.icon,
              })),
            );
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { hotels, isLoading };
};
