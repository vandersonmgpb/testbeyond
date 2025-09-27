import { faker } from '@faker-js/faker'

export const getUser = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password: 'pwd123',
           title: faker.music.songName()
        }
    }
    
export const getUserWithLink = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName }).toLowerCase(),
        password: 'pwd123',
        link: {
            original_url: faker.internet.url(),
            title: faker.music.songName()
        }
    }
}
