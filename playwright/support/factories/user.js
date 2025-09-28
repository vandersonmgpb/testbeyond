import { faker } from '@faker-js/faker'

export const getUser = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName, provider: 'fulano.dev' }).toLowerCase(),
        password: 'pwd123',
        title: faker.music.songName()
    }
}

export const getUserWithLink = () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName, provider: 'fulano.dev' }).toLowerCase(),
        password: 'pwd123',
        link: {
            original_url: faker.internet.url(),
            title: faker.music.songName()
        }
    }
}

export const getUserWithLinks = (linksCount = 1) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        name: `${firstName} ${lastName}`,
        email: faker.internet.email({ firstName, lastName, provider: 'fulano.dev' }).toLowerCase(),
        password: 'pwd123',
        links: faker.helpers.multiple(() => ({
            original_url: faker.internet.url(),
            title: faker.music.songName()
        }), { count: linksCount })
    }
}
