const supertest = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const data = require('../dummyData/test_data')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})


// describe("user endpoint tests", () => {
//   describe('[POST] /api/users/register', () => {
    
//     it('creates a new user', async () => {
//       const res = await supertest(server)
//         .post('/api/users/register')
//         .send({
//           username: 'jimbo',
//           email: 'jimbo@slice.com',
//           password: 'slice'
//         })
//       expect(res.statusCode).toBe(201)
//       expect(res.type).toBe("application/json")
//       expect(res.body.id).toBeDefined()
//       expect(res.body.username).toBe('jimbo')
//     })

//     it('gives correct error if registrations details invalid', async () => {
//       const res = await supertest(server)
//         .post('/api/users/register')
//         .send({
//           username: '',
//           email: '',
//           password: 'hi there'
//         })
//         expect(res.statusCode).toBe(404)
//         expect(res.body.message).toBe('username, email, and password required')
//     })
//   })
//   describe('[GET] /api/users/:id', () => {
//     it('returns the correct user details', async () => {
//       const res = await supertest(server)
//         .get('/api/users/1')
//       expect(res.statusCode).toBe(200)
//       expect(res.body.username).toBe()
//         })
//     })
// })

//RECIPE TESTS

describe('RECIPE TESTS', () => {

  describe('[GET] /api/recipes', () => {
    it('returns the correct recipes', async () => {
      const res = await supertest(server)
        .get('/api/recipes')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body[0].recipe_name)
        .toBe("Blistered Green Beans with Garlic")
      expect(res.body[0].ingredients.length).toBe(6)
    })
  })

  describe('[POST] /api/recipes', () => {
    it('adds recipe correctly', async () => {
      const res = await supertest(server)
        .post('/api/recipes')
        .send(data.newRecipe)
      expect(res.statusCode).toBe(201)
      expect(res.type).toBe('application/json')
      expect(res.body.recipe_name).toBe('Test Dish')
    })
  })

  describe('[PUT] /api/recipes/:id', () => {
    it('updates recipe correctly', async () => {
      const res = await supertest(server)
        .put('/api/recipes/1')
        .send(data.updatedRecipe)
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.recipe_name).toBe('Update Test')
    })
  })

  describe('[DELETE] /api/recipes/:id', () => {
    it('updates recipe correctly', async () => {
      const res = await supertest(server)
        .delete('/api/recipes/1')
      expect(res.statusCode).toBe(200)
      expect(res.type).toBe('application/json')
      expect(res.body.message).toBe('recipe successfully deleted')
    })
  })



})
