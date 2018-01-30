import * as gmaps from '@google/maps';
import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';

/**
 * Main class for Express Server
 */
export class Main {

    /**
     * Express App
     */
    private _app;

    /**
     * Express Server
     */
    private _server;

    /**
     * Settings
     */
    private _settings;

    /**
     * Google Map Client
     */
    private _mapService;

    /**
     * Constructor
     *
     * @param settings
     */
    constructor(settings?: Object) {
        this._app = express();

        if (settings) {
            this._settings = settings;
        } else {
            this._settings = JSON.parse(fs.readFileSync('settings.json', 'utf-8'));
        }

        this._mapService = gmaps.createClient({ key: this._settings.googleMapsAPIKey });
    }

    /**
     * Get settings
     */
    public get settings() {
        return this._settings;
    }

    /**
     * Get the Google Client
     */
    public get mapService() {
        return this._mapService;
    }

    /**
     * Initialize
     */
    public init(): Main {
        return this
            .addLoggingInterceptor()
            .registerAPIHandlers()
            .setupStaticContent()
            .addDefaultRoutes();
    }

    /**
     * Add Logging Interceptor
     */
    public addLoggingInterceptor(): Main {
        this._app.use((req, res, next) => {
            console.log(`[${req.method}] - [${req.path}]`);
            next();
        });

        return this;
    }

    /**
     * Add default routes
     */
    public addDefaultRoutes(): Main {
        // redirect to root
        // app.use('**', (req,res) => res.redirect('/'));
        this._app.use('**', (req, res) => res.sendFile(__dirname + '/index.html'));

        return this;
    }

    /**
     * Expose any static content
     */
    public setupStaticContent(): Main {
        this._app.use(express.static(__dirname));

        return this;
    }

    /**
     * Register all API handlers
     */
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

    /**
     * Start the server
     */
    public start(): void {
        this._server = this._app.listen(this._settings.port);
        console.log('server listening on port: ', this._settings.port);
    }

    /**
     * Stop the server
     */
    public stop(): void {
        console.log('server stopping');
        this._server.close();
    }
}

if (require.main === module) {
    new Main()
        .init()
        .start();
}
