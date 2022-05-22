const request = require('supertest');
const app = require('../../app');
const{ mongoConnect, mongoDisconnect} = require('../../services/mongo')
const { deleteOne } = require('../../models/planets.mongo');


describe('Launches', () => {

    beforeAll(async () => {
        await mongoConnect();
    })

    afterAll(async () => {
        // Closing the DB connection allows Jest to exit successfully.
        await mongoDisconnect();
    })
    
    
    describe('Test GET /v1/launches', () => {
        it('it should response with 200 success', async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
            
            
        })
    })
    
    describe('Test POST /v1/launches', () => {
        
        const completeLaunchData = {
            mission: "ZTM155",
            rocket: "ZTM Experimental IS1",
            target: "Kepler-62 f",
            launchDate: "July 1, 2028"
        }
        
        const launchDataWithoutDate = {
            mission: "ZTM155",
            rocket: "ZTM Experimental IS1",
            target: "Kepler-62 f"
        }
        
        const launchDataWithInvalidDate = {
            mission: "ZTM155",
            rocket: "ZTM Experimental IS1",
            target: "Kepler-62 f",
            launchDate: "hello"
        }
        
        test('it should response with 201 created', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
            
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
            
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
        
        test('it should catch missing required properties', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
            
            expect(response.body).toStrictEqual({
                error: 'Mission required launch property',
            })
        });
        
        test('it should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
            
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date',
            });
        });
    })
    
    // describe('Test DELETE /v1/launches/:id', () => {
        //     test('it should response with', ()=> {
            //         expect
            //     })
            // })
    
        
   
})