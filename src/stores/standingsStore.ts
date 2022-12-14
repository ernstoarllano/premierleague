import { env } from '$lib/env'
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

export const standings = writable<Standing[] | []>([])
export const isLoading = writable<boolean | false>(false)

/**
 * Return standings data from API
 *
 * @url https://www.api-football.com/documentation-v3#tag/Standings/operation/get-standings
 * @returns {array of objects}
 */
export const fetchStandings = async () => {
	const league = 39
	const year = new Date().getFullYear()
	const url = `https://v3.football.api-sports.io/standings?league=${league}&season=${year}`
	const headers = {
		'x-rapidapi-host': 'v3.football.api-sports.io',
		'x-rapidapi-key': env.FOOTBALL_API
	}

	try {
		isLoading.set(true)

		const res = await fetch(url, { headers })
		const data = await res.json()

		if (data.errors) {
			for (const [key, value] of Object.entries(data.errors)) {
				throw new Error(`${key}: ${value}`)
			}
		}

		standings.set(data.response[0].league.standings[0])
		isLoading.set(false)

		return standings
	} catch (err) {
		console.error(err)

		throw err
	}
}
