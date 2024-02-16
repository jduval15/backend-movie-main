const request = require('supertest');
const app = require('../app');


//*GET ALL director
test('GET /directors ', async() => { 
    const res = await request(app)
        .get('/directors')

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//*CREATE director
test('POST /directors ', async() => {
    
    const newdirector = {
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "www.steven.com",
        birthday: "1982-07-22"
    }

    const res = await request(app)
        .post('/directors')
        .send(newdirector)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe("Steven");
});

//*MODIFY DIRECTOR
test("PUT /directors/:id ", async() => {
    const director = {
        firstName: "director actualizado"
    }

    const res = await request(app)
        .put(`/directors/${id}`)
        .send(director)

    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe("director actualizado");
})

//*DELETE director
test('DELETE /directors/:id', async() => {
    const res = await request(app)
        .delete(`/directors/${id}`)

    expect(res.status).toBe(204);
})