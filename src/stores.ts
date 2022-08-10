import { derived, writable } from 'svelte/store'

const headers = {
	'x-rapidapi-host': 'v3.football.api-sports.io',
	'x-rapidapi-key': '364b958f521c13e1d39153898a940d79'
}

/**
 * Data definitions
 */
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

type League = {
	id: number
	name: string
	country: string
	logo: string
	flag: string
	season: number
	standings: Standing[]
}

/**
 * Store data for standings
 */
export const apiData = writable<League | Record<string, never>>({})

/**
 * Fetch standings data from API
 */
export const getStandings = async () => {
	const league = 39
	const date = new Date()
	const year = date.getFullYear()
	const endpoint = `https://v3.football.api-sports.io/standings?league=${league}&season=${year}`

	try {
		const getStandings = await fetch(`${endpoint}`, { headers })

		const data = await getStandings.json()

		if (data.errors) {
			for (const [key, value] of Object.entries(data.errors)) {
				throw new Error(`${key}: ${value}`)
			}
		}

		apiData.set(data.response[0].league)
	} catch (err) {
		console.error(err)

		throw err
	}
}

/**
 * Standings transformation
 * We'll create a derived store to hold the data we want to display
 */
export const currentStandings = derived(apiData, ($apiData) => {
	if ($apiData.standings) {
		return $apiData.standings.map((standing) => ({
			rank: standing.rank,
			logo: standing.team.logo,
			team: standing.team.name,
			played: standing.all.played,
			goalsDiff: standing.goalsDiff,
			points: standing.points
		}))
	}

	return
})
