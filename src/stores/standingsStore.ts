import { writable } from 'svelte/store'

type Standing = {
	rank: number
	team: {
		id: number
		name: string
		logo: string
	}
	points: number
	goalsDiff: number
	form: string
	all: {
		played: number
		win: number
		draw: number
		lose: number
		goals: {
			for: number
			against: number
		}
	}
}

/**
 * Return standings data from API
 *
 * @url https://www.api-football.com/documentation-v3#tag/Standings/operation/get-standings
 * @returns {array of objects}
 */
export const getStandings = () => {
	const cache = new Map()
	const store = writable<Standing[] | []>([])

	const league = 39
	const year = new Date().getFullYear()
	const url = `https://v3.football.api-sports.io/standings?league=${league}&season=${year}`
	const headers = {
		'x-rapidapi-host': 'v3.football.api-sports.io',
		'x-rapidapi-key': '364b958f521c13e1d39153898a940d79'
	}

	// TODO: Need to check if data is being cached
	if (cache.has(url)) {
		console.log(cache.get(url))

		store.set(cache.get(url))
	}

	const load = async () => {
		const res = await fetch(url, { headers })
		const data = await res.json()

		if (data.errors) {
			for (const [key, value] of Object.entries(data.errors)) {
				throw new Error(`${key}: ${value}`)
			}
		}

		console.log(data.response[0].league.standings[0])

		// TODO: Need to check if data is being cached
		cache.set(url, data.response[0].league.standings[0])
		store.set(data.response[0].league.standings[0])
	}

	load()

	return store
}
