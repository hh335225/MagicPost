import axios from 'axios';

const openRouteServiceApiKey = '5b3ce3597851110001cf62484d199e4bdca24149905dbde778970d4b';


class DistanceController {

    async getDistance(req, res, next) {
        const { city1, city2 } = req.body;

        try {
            const response1 = await axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${openRouteServiceApiKey}&text=${city1}`);
            const coordinates1 = response1.data.features[0].geometry.coordinates;
            const location1 =  { lat: coordinates1[1],lng: coordinates1[0] };
            

            const response2 = await axios.get(`https://api.openrouteservice.org/geocode/search?api_key=${openRouteServiceApiKey}&text=${city2}`);
            const coordinates2 = response2.data.features[0].geometry.coordinates;
            const location2 =  { lat: coordinates2[1],lng: coordinates2[0] };


            const response3 = await axios.post('https://api.openrouteservice.org/v2/directions/driving-car', {
                coordinates: [
                    [location1.lng, location1.lat],
                    [location2.lng, location2.lat]
                ],
                format: 'geojson',
                profile: 'driving-car',
            }, {
                headers: {
                    'Authorization': `Bearer ${openRouteServiceApiKey}`,
                    'Content-Type': 'application/json',
                },
            });
        
            console.log(location1, location2)
            console.log(response3.data.routes[0].segments[0].distance)
            var distance = parseInt(response3.data.routes[0].segments[0].distance / 1000);
            res.json({ distance: distance });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new DistanceController;