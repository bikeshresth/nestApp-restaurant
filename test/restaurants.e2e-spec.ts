import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as mongoose from 'mongoose';
import { user } from './auth.e2e-spec';

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeAll(() => {
        mongoose.connect(process.env.DB_URI_LOCAL, function () {
            mongoose.connection.db.dropDatabase()
        })
    })

    afterAll(() => mongoose.disconnect())

    const newRestaurant = {
        name: "dillbazar Fast Foood Restaurant",
        description: "Made from boban",
        email: "umb@umb.com",
        phoneNo: "9788246116",
        category: "Fast Food",
        address: "Kakni Fish Farm"
    }

    it('/ (POST) - register a new user', () => {
        return request(app.getHttpServer())
            .post('/auth/signup')
            .send(user)
            .expect(201)
            .then((res) => {
                expect(res?.body?.email)?.toBeDefined();
            })
    });

    let jwtToken;
    let restaurantCreate;

    it('/ (GET) - LOGIN user', () => {
        return request(app.getHttpServer())
            .get('/auth/login')
            .send({ email: user.email, password: user.password })
            .expect(200)
            .then((res) => {
                expect(res.body.token)?.toBeDefined();
                jwtToken = res.body.token
            })
    });

    it('/ (POST) - register a new Restaurant', () => {
        return request(app.getHttpServer())
            .post('/restaurants')
            .send(newRestaurant)
            .expect(201)
            .then((res) => {
                expect(res?.body?._id)?.toBeDefined();
                expect(res?.body?.name)?.toEqual(newRestaurant.name);
                restaurantCreate = res.body
            })
    });

    it('/ (GET) - Get all Restaraunts', () => {
        return request(app.getHttpServer())
            .get('/restaurants')
            .expect(200)
            .then((res) => {
                expect(res.body.length)?.toBe(1);
            })
    });

    it('/ (GET) - Get restaurant by ID', () => {
        return request(app.getHttpServer())
            .get(`/restaurants/${restaurantCreate._id}`)
            .send({ email: user.email, password: user.password })
            .expect(200)
            .then((res) => {
                expect(res.body)?.toBeDefined();
                expect(res.body._id).toEqual(restaurantCreate._id)
            })
    });

    it('/ (Put) - Update restaurant by ID', () => {
        return request(app.getHttpServer())
            .put(`/restaurants/${restaurantCreate._id}`)
            .send({ name: 'Bikesh' })
            .expect(200)
            .then((res) => {
                expect(res.body)?.toBeDefined();
                expect(res.body.name).toEqual('Bikesh')
            })
    });

    it('/ (DELETE) - Delete restaurant by ID', () => {
        return request(app.getHttpServer())
            .delete(`/restaurants/${restaurantCreate._id}`)
            .expect(200)
            .then((res) => {
                expect(res.body)?.toBeDefined();
                expect(res.body.deleted).toEqual(true)
            })
    });
});
