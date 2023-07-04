import InMemoryDatabase from '../../src/infra/db/in-memory'
import IdGenerator from '../../src/infra/utils/uuid'

interface User {
    id: string,
    name: string,
    password: string,
    email: string,
    phone: number
}

const initQuery = `create table user ( 
    id varchar(36) not null primary key, 
    name varchar(50) not null, 
    email varchar(50) not null, 
    password varchar(50) not null,
    phone int not null
    );`

const dropQuery = 'drop table user;'

const inMemory = new InMemoryDatabase()
inMemory.initQuery = initQuery
inMemory.dropQuery = dropQuery


describe('user related queries', () => {
    it('should create a user', async () => {
        await inMemory.connect()
        const uuidGenerator = new IdGenerator()
        const id = uuidGenerator.generate()
        const user = {
            id,
            name: 'pedro',
            email: 'pedro-brandao2012@hotmail.com',
            phone: 11973321430,
            password: 'xqcRE2D2'
        }
        await inMemory.run(
            `insert into user (id, name, email, password, phone) 
             values ('${user.id}', '${user.name}', '${user.email}', '${user.password}', ${user.phone})
            `)
        const results = await inMemory.get<User>(`select * from user where id = '${id}'`)
        await inMemory.clear()
        expect(results).toEqual(user)
    })
})

afterAll(async () => {
    await inMemory.disconnect()
})