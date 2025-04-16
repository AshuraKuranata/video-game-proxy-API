const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
const PORT = 3060
const API_KEY = process.env.RAWG_API_KEY

app.get('/api/games', async (req, res) => {
    const search = req.query.search || ''
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from RAWG API' })
    }
})

app.get('/api/games/:gameId', async (req, res) => {
    const gameId = req.params.gameId
    const url = `https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from RAWG API' })
    }
})

app.listen(PORT, () => {
    console.log(`Proxy server running on http://34.228.71.240:3060/api/games:${PORT}`)
})