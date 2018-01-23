import * as gmaps from '@google/maps';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';


export class Main {

    private _app;
    private _server;
    private _settings;
    private _mapService;

    constructor(settings?: Object) {
        this._app = express();

        if(settings){
            this._settings = settings;
        } else {
            this._settings = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));
        }
        
        this._mapService = gmaps.createClient({ key: this._settings.googleMapsAPIKey });
    }

    public get settings() {
        return this._settings;
    }

    public init(): Main {
        return this
            .addLoggingInterceptor()
            .registerAPIHandlers()
            .setupStaticContent()
            .addDefaultRoutes();
    }

    public addLoggingInterceptor(): Main {
        this._app.use((req, res, next) => {
            console.log(`[${req.method}] - [${req.path}]`);
            next();
        });

        return this;
    }

    public addDefaultRoutes(): Main {
        // redirect to root
        // app.use('**', (req,res) => res.redirect('/'));
        this._app.use('**', (req, res) => res.sendFile(__dirname + '/index.html'));

        return this;
    }

    public setupStaticContent(): Main {
        this._app.use(express.static(__dirname));

        return this;
    }

    public registerAPIHandlers(): Main {
        this._app.post('/nearby', express.json(), (request: Request, response: Response, next: NextFunction) => {
            this._mapService.placesNearby({
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

        return this;
    }

    public start(): void {
        this._server = this._app.listen(this._settings.port);
        console.log('server listening on port: ', this._settings.port);
    }

    public stop(): void {
        console.log('server stopping');
        this._server.close();
    }
}
