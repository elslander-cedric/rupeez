import { expect } from 'chai';
import { request } from 'supertest';

import * as main from './main';

const request = require('supertest');

describe('main', () => {
    it('server should return list of nearby atms', (done) => {
        request(main.app)
            .post('/nearby')
            .send({ type: 'atm', location: { latitude: 51.07, longitude: 3.74 }})
            .set('accept', 'json')
            .end((err, res) => {
                expect(res.body).to.has.length.greaterThan(0);
                done();
            });
    });
});
