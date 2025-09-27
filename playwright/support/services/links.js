

export const linksService = (request) => {
    const createLink = async(link, token) => {
        return await request.post('/api/links', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: link
        })
    }

    const createAndReturnLinkId = async(link, token) => {
        const response = await createLink(link, token)
        const body = await response.json()
        return body.data.id
    }

    const getLinks = async(token)=> {
        return await request.get('/api/links', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    const removeLink = async(linkId, token)=> {
        return await request.delete(`/api/links/${linkId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    return {
        createLink,
        getLinks,
        createAndReturnLinkId,
        removeLink
    }
}