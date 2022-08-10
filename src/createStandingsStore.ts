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

export const createStandingsStore = () => {
	const { subscribe, set, update } = writable<Standing[]>([])

	const league = 39
	const date = new Date()
	const year = date.getFullYear()
	const endpoint = `https://v3.football.api-sports.io/standings?league=${league}&season=${year}`

	const headers = {
		'x-rapidapi-host': 'v3.football.api-sports.io',
		'x-rapidapi-key': '364b958f521c13e1d39153898a940d79'
	}

	return {
		subscribe,
		set,
		update,
		init: async () => {
			try {
				const req = await fetch(`${endpoint}`, { headers })
				const res = await req.json()

				set(res.response[0])
			} catch (err) {
				console.error(err)

				throw err
			}
		}
	}
}

export const standingsStore = createStandingsStore()
