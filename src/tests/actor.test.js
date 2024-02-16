const request = require('supertest');
const app = require('../app');
require('../models');

let id;
let token;

//*GET ALL ACTORES
test('GET /actors', async() => { 
    const res = await request(app)
        .get('/actors')

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//*CREATE ACTOR
test('POST / actors debe de crear un actor', async() => {
    
    const newActor = {
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "www.steven.com",
        birthday: "1982-07-22"
    }

    const res = await request(app)
        .post('/actors')
        .send(newActor)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe("Steven");
});

//*MODIFY USER
test("PUT /actors/:id", async() => {
    const actor = {
        firstName: "actor actualizado"
    }

    const res = await request(app)
        .put(`/actors/${id}`)
        .send(actor)

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("actor actualizado");
})

//*DELETE ACTOR
test('DELETE /actors ', async() => {
    const res = await request(app)
        .delete(`/actors/${id}`)

    expect(res.status).toBe(204);
})