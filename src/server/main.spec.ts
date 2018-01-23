import { expect } from 'chai';
import * as http from 'http';
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

    it('server should return list of nearby atms', (done) => {
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
});
