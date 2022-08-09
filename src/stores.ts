import { derived, writable } from 'svelte/store'

const headers = {
	'X-Auth-Token': '116926a1c2c3461a9118dd952fd216b5'
}
const cors = 'https://cors-anywhere.herokuapp.com'

/**
 * Define store for standings
 */
type Standing = {
	position: number
	points: number
	won: number
	draw: number
	lost: number
	goalDifference: number
	goalsAgainst: number
	goalsFor: number
	playedGames: number
	team: {
		shortName: string
	}
}

/**
 * Store data for standings
 */
export const apiData = writable<Standing[] | []>([])

/**
 * Fetch standings data from API
 */
export const getStandings = async () => {
	const standingsEndpoint = 'https://api.football-data.org/v4/competitions/PL/standings'

	try {
		const getStandings = await fetch(`${cors}/${standingsEndpoint}`, {
			headers
		})

		const data = await getStandings.json()

		console.log(data.standings[0].table)
		apiData.set(data.standings[0].table)
	} catch (err) {
		console.error(err)

		throw err
	}
}

/**
 * Standings transformation
 * We'll create a derived store to hold the data we want to display
 */
export const standings = derived(apiData, ($apiData) => {
	if ($apiData.length > 0) {
		return $apiData.map((standing) => ({
			position: standing.position,
			points: standing.points,
			won: standing.won,
			draw: standing.draw,
			lost: standing.lost,
			goalDifference: standing.goalDifference,
			goalsAgainst: standing.goalsAgainst,
			goalsFor: standing.goalsFor,
			playedGames: standing.playedGames,
			team: standing.team.shortName
		}))
	}

	return []
})
