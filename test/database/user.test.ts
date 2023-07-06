import UserService from '../../src/application/services/user'
import InMemoryDatabase from '../../src/infra/db/in-memory'
import IdGenerator from '../../src/infra/utils/uuid'
import { iocContainer } from '../../src/presentation/ioc'

const initQuery = `create table user ( 
    id varchar(36) not null primary key, 
    name varchar(50) not null, 
    email varchar(50) not null, 
    password varchar(50) not null,
    phone int not null
    );`

const dropQuery = 'drop table user;'


describe('user related queries', () => {
    it('should create a user', async () => {
        const service = iocContainer.get<UserService>('IUserService')
        await service.signup({name: 'Pedro', email: 'pedro-brandao2012@hotmail.com', password: 'Aracnideo1!', phone: 11973321430})
        const userInfo = await service.signin({email: 'pedro-brandao2012@hotmail.com', password: 'Aracnideo1!'})
        expect(userInfo).toEqual({name: 'Pedro', email: 'pedro-brandao2012@hotmail.com', phone: 11973321430})
    })

    it('should return all the users', async () => {
        const uuid = new IdGenerator()
        const inMemoryDatabase = new InMemoryDatabase()
        inMemoryDatabase.initQuery = initQuery
        inMemoryDatabase.dropQuery = dropQuery
        await inMemoryDatabase.connect()
        const user1 = {
            id: uuid.generate(),
            name: 'Flavio',
            email: 'flavio134@hotmail.com',
            phone: 1193939492,
            password: 'xqcE21A3'
        }
        const user2 = {
            id: uuid.generate(),
            name: 'Flavia',
            email: 'flavia134@hotmail.com',
            phone: 1193934322,
            password: 'xqcE2aaaa33'
        }
        await inMemoryDatabase.run(`insert into user (id, name, email, phone, password) 
        values ('${user1.id}', '${user1.name}', '${user1.email}', '${user1.phone}', '${user1.password}')    
        `)
        await inMemoryDatabase.run(`insert into user (id, name, email, phone, password) 
        values ('${user2.id}', '${user2.name}', '${user2.email}', '${user2.phone}', '${user2.password}')    
        `)
        const users = await inMemoryDatabase.get('select * from user')
        expect(users).toEqual([user1, user2])
    })
})
