import request from 'supertest';

// Don't edit this file except the line below!
const PORT = 3000;

describe('Node-Express Exercise Tester', () => {
    const apiRootUrl = `http://localhost:${PORT}`;

    describe('PUT /:id', () => {
        it('returns a 200 and the request body for new values', async () => {
            await request(apiRootUrl)
                .put('/0')
                .send({
                    message: 'Record 0',
                })
                .expect('Content-Type', /json/)
                .expect(200, {
                    message: 'Record 0',
                });
            await request(apiRootUrl)
                .put('/1')
                .send({
                    message: 'Record 1',
                })
                .expect('Content-Type', /json/)
                .expect(200, {
                    message: 'Record 1',
                });
        });

        it('returns a 200 and the request body for existing values', async () => {
            await request(apiRootUrl)
                .put('/0')
                .send({
                    message: 'Record 0.1',
                })
                .expect('Content-Type', /json/)
                .expect(200, {
                    message: 'Record 0.1',
                });
        });
    });

    describe('GET /', () => {
        it('returns a 200 and an object of records', async () => {
            await request(apiRootUrl)
                .get('/')
                .expect('Content-Type', /json/)
                .expect(200, {
                    '0': {
                        message: 'Record 0.1',
                    },
                    '1': {
                        message: 'Record 1',
                    },
                });
        });
    });

    describe('GET /:id', () => {
        it('returns a 200 and the record value when it exists', async () => {
            await request(apiRootUrl)
                .get('/0')
                .expect('Content-Type', /json/)
                .expect(200, {
                    message: 'Record 0.1',
                });
        });
        it('returns a 404 and an empty JSON object when it does not exist', async () => {
            await request(apiRootUrl)
                .get('/6214387162938469871263498')
                .expect('Content-Type', /json/)
                .expect(404, {});
        });
    });

    describe('DELETE /:id', () => {
        it('returns a 200 and an empty JSON object it exists', async () => {
            await request(apiRootUrl)
                .delete('/1')
                .expect('Content-Type', /json/)
                .expect(200, {});

            await request(apiRootUrl)
                .get('/1')
                .expect('Content-Type', /json/)
                .expect(404, {});
        });
        it('returns a 404 and an empty JSON object when it does not exist', async () => {
            await request(apiRootUrl)
                .delete('/6214387162938469871263498')
                .expect('Content-Type', /json/)
                .expect(404, {});
        });
    });
});
