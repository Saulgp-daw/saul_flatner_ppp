const express = require('express');
const axios = require('axios');
const app = express();
const port = 3010;

app.get('/country', async (req, res) => {
    const { lat, lng } = req.query;
    const apiKey = 'AIzaSyAB6k62OKXyqu6lz4l03HE4sou7kMMhk98';  // Reemplaza 'TU_API_KEY' con tu clave API real de Google Maps.
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const addressComponents = response.data.results[0].address_components;
        const formattedAddress = response.data.results[0].formatted_address;
        const countryComponent = addressComponents.find(component => component.types.includes("country"));
        const country = countryComponent ? countryComponent.long_name : "Unknown Country";
        const streetComponent = addressComponents.find(component => component.types.includes("route"));
        const street = streetComponent ? streetComponent.long_name : "Unknown Street";
        const cityComponent = addressComponents.find(component => component.types.includes("locality"));
        const city = cityComponent ? cityComponent.long_name : "Unknown City";
        const locationDetails = {
            country: country,
            street: street,
            city: city,
            formattedAddress: formattedAddress,
            // Agrega más detalles aquí según sea necesario
        };
        console.log(locationDetails);
        res.send(locationDetails);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).send('Error fetching country');
    }
});

app.listen(port, () => {
    console.log(`Geocoding service running on http://localhost:${port}`);
});
