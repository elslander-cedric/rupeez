import { expect } from 'chai';
import * as http from 'http';
import * as mockfs from 'mock-fs';
import * as sinon from 'sinon';

import { Main } from './main';

describe('main', () => {
    let main;

    before(() => {
        main = new Main({
            port: 9876,
            googleMapsAPIKey: 'AIzaSyATJnu9FYOi3-s2QZqmKne3LS_ECbUzc-M'
        });
        main.init();
    });

    beforeEach(() => {
        main.start();
    });

    afterEach(() => {
        main.stop();
    });

    it('should return list of nearby atms', (done) => {
        const body = JSON.stringify({
            type: 'atm',
            location: {
                latitude: 51.07,
                longitude: 3.74
            }
        });

        const request = http.request({
            hostname: 'localhost',
            path: '/nearby',
            method: 'POST',
            port: main.settings.port,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        } as http.RequestOptions, (response: http.IncomingMessage) => {
            response.on('data', (chunk) => {
                expect(JSON.parse(chunk.toString())).to.has.length.greaterThan(0);
                done();
            });
        });

        request.write(body);
        request.end();
    });

    it('should return error when googlemaps failed', (done) => {
        main.mapService.placesNearby = sinon.spy((data, callback) => {
            callback('could not get data');
        });

        const body = JSON.stringify({
            type: 'atm',
            location: {
                latitude: 51.07,
                longitude: 3.74
            }
        });

        const request = http.request({
            hostname: 'localhost',
            path: '/nearby',
            method: 'POST',
            port: main.settings.port,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        } as http.RequestOptions, (response: http.IncomingMessage) => {
            expect(main._mapService.placesNearby.called).to.be.true;
            expect(response.statusCode).to.equal(500);
            expect(response.statusMessage).to.equal('could not get data');
            done();
        });

        request.write(body);
        request.end();
    });

    it('should redirect to home page', (done) => {
        mockfs({
            'src/server/index.html': '<html><body>home page</body></html>'
        });

        after(() => mockfs.restore());

        const request = http.request({
            hostname: 'localhost',
            path: '/some/path/that/doesnt/exist',
            method: 'GET',
            port: main.settings.port
        } as http.RequestOptions, (response: http.IncomingMessage) => {
            response.on('data', chunk => {
                expect(chunk.toString()).to.equal('<html><body>home page</body></html>');
            });

            response.on('end', () => {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        request.end();
    });
});


describe('main fs', () => {
    let main;

    before(() => {
        mockfs({
            'settings.json': '{ "port": 9876 }'
        });

        main = new Main();
        main.init();
    });

    beforeEach(() => {
        main.start();
    });

    afterEach(() => {
        main.stop();
    });

    after(() => mockfs.restore());

    it('should read settings', () => {
        expect(main.settings.port).to.equal(9876);        
    });
});