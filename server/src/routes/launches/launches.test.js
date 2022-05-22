const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { deleteOne } = require('../../models/planets.mongo');

beforeAll(async () => {
    const url = 'mongodb+srv://nasa-api:wRUCoUXLfHLIBGoN@cluster0.ht0yf.mongodb.net/nasa?retryWrites=true&w=majority';
    await mongoose.connect(url);
})

afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close();
})

describe('Test GET /launches', () => {
    it('it should response with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
        
        
    })
})

// describe('Test POST /launches', () => {

//     const completeLaunchData = {
//         mission: "ZTM155",
//         rocket: "ZTM Experimental IS1",
//         target: "Kepler-186 f",
//         launchDate: "July 1, 2028"
//     }

//     const launchDataWithoutDate = {
//         mission: "ZTM155",
//         rocket: "ZTM Experimental IS1",
//         target: "Kepler-186 f"
//     }

//     const launchDataWithInvalidDate = {
//         mission: "ZTM155",
//         rocket: "ZTM Experimental IS1",
//         target: "Kepler-186 f",
//         launchDate: "hello"
//     }

//     test('it should response with 201 created', async () => {
//         const response = await request(app)
//             .post('/launches')
//             .send(completeLaunchData)
//             .expect('Content-Type', /json/)
//             .expect(201);

//         const requestDate = new Date(completeLaunchData.launchDate).valueOf();
//         const responseDate = new Date(response.body.launchDate).valueOf();
//         expect(responseDate).toBe(requestDate);

//         expect(response.body).toMatchObject(launchDataWithoutDate);
//     });

//     test('it should catch missing required properties', async () => {
//         const response = await request(app)
//             .post('/launches')
//             .send(launchDataWithoutDate)
//             .expect('Content-Type', /json/)
//             .expect(400);

//         expect(response.body).toStrictEqual({
//             error: 'Mission required launch property',
//         })
//     });

//     test('it should catch invalid dates', async () => {
//         const response = await request(app)
//             .post('/launches')
//             .send(launchDataWithInvalidDate)
//             .expect('Content-Type', /json/)
//             .expect(400);

//         expect(response.body).toStrictEqual({
//             error: 'Invalid launch date',
//         });
//     });
// })

// describe('Test DELETE /launches/:id', () => {
//     test('it should response with', ()=> {
//         expect
//     })
// })