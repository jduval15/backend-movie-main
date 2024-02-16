const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');


//*GET ALL MOVIES
test('GET /movies ', async() => { 
    const res = await request(app)
        .get('/movies')

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

//*CREATE MOVIE
test('POST /movies', async() => {
    
    const newMovie = {
        name: "La ruleta",
        image: "www.steven.com",
        synopsis: "Esta es la sinopsis",
        releaseYear: 1999
    }

    const res = await request(app)
        .post('/movies')
        .send(newMovie)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("La ruleta");
});

//*MODIFY MOVIE
test("PUT /movies/:id ", async() => {
    const movie = {
        name: "ruleta actualizado"
    }

    const res = await request(app)
        .put(`/movies/${id}`)
        .send(movie)

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("ruleta actualizado");
})

//*POST GENRE IN A MOVIE
test('POST /movies/:id/genres', async() => {
    const genre = await Genre.create({
        name: "Suspenso"
    })

    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([ genre.id ]);
    
    await genre.destroy();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
}) 

//*POST ACTOR IN A MOVIE
test('POST /movies/:id/actors', async() => {
    const actor = await Actor.create({
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "www.steven.com",
        birthday: "1982-07-22"
    })

    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([ actor.id ]);
    
    await actor.destroy();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
}) 

//*POST DIRECTOR IN A MOVIE
test('POST /movies/:id/directors', async() => {
    const director = await Director.create({
        firstName: "Steven",
        lastName: "Spielberg",
        nationality: "American",
        image: "www.steven.com",
        birthday: "1982-07-22"
    })

    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([ director.id ]);
    
    await director.destroy();

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
}) 

//*DELETE MOVIES
test('DELETE /movies ', async() => {
    const res = await request(app)
        .delete(`/movies/${id}`)

    expect(res.status).toBe(204);
})


