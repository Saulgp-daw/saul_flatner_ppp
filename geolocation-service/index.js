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
        const countryComponent = addressComponents.find(component => component.types.includes("country"));
        const country = countryComponent ? countryComponent.long_name : "Unknown Country";
        console.log(country);
        res.send({ country });
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).send('Error fetching country');
    }
});

app.listen(port, () => {
    console.log(`Geocoding service running on http://localhost:${port}`);
});
