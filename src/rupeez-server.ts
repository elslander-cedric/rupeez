import * as gmaps from '@google/maps';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

const app = express();
//const map = gmaps();

const settings = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));

const mapService = gmaps.createClient({ key: settings.googleMapsAPIKey });

app.use((req, res, next) => {
    console.log(`[${req.method}] - [${req.path}]`);
    next();
});

app.use(express.static('dist'));

app.use('/nearby', express.json());
app.post('/nearby', (request: Request, response: Response, next: NextFunction) => {
    console.log('data: ', request.body);

    mapService.placesNearby({
        opennow: true,
        type: request.body.type,
        location: request.body.location,
        rankby: 'distance'
    }, (err, res) => {
        if (!err) {
            console.log("got data: ", res.json);
            // res.pipe(response, { end: true });

            response.send(res.json.results.map(place => {
                return {
                    longitude: place.geometry.location.lng,
                    latitude: place.geometry.location.lat
                }
            }));
        } else {
            response.statusMessage = err;
            response.sendStatus(500);
        }
    });
});

app.listen(settings.port);

console.log('server listening on port: ', settings.port);
