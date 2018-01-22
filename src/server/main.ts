import * as gmaps from '@google/maps';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

export const app = express();

const settings = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));
const mapService = gmaps.createClient({ key: settings.googleMapsAPIKey });

// logger
app.use((req, res, next) => {
    console.log(`[${req.method}] - [${req.path}]`);
    next();
});

// API handlers
app.post('/nearby', express.json(), (request: Request, response: Response, next: NextFunction) => {
    mapService.placesNearby({
        opennow: true,
        type: request.body.type,
        location: request.body.location,
        rankby: 'distance'
    }, (err, res) => {
        if (!err) {
            // res.pipe(response, { end: true });

            response.send(res.json.results.map(place => {
                return {
                    longitude: place.geometry.location.lng,
                    latitude: place.geometry.location.lat
                };
            }));
        } else {
            response.statusMessage = err;
            response.sendStatus(500);
        }
    });
});

// static files
app.use(express.static(__dirname));

// redirect to root
// app.use('**', (req,res) => res.redirect('/'));
app.use('**', (req, res) => res.sendFile(__dirname + '/index.html'));
app.listen(settings.port);

console.log('server listening on port: ', settings.port);
