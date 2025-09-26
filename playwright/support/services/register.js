
export const registerServices = (request) => {

    const createUser = async (user) => {

        return await request.post('http://localhost:3333/api/auth/register', {
            data: user
        })

    }

    return {
        createUser
    }
}