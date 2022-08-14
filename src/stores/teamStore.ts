import { env } from '$lib/env'
import { writable } from 'svelte/store'

type Team = {
	code: string
	country: string
	founded: number
	id: number
	logo: string
	name: string
	national: boolean
}

export const team = writable<Team | Record<string, never>>({})
export const isLoading = writable<boolean | false>(false)

/**
 * Return standings data from API
 *
 * @url https://www.api-football.com/documentation-v3#tag/Standings/operation/get-standings
 * @returns {array of objects}
 */
export const fetchTeam = async (name: string) => {
	const league = 39
	const year = new Date().getFullYear()
	const url = `https://v3.football.api-sports.io/teams?name=${name}&league=${league}&season=${year}`
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

		team.set(data.response[0].team)
		isLoading.set(false)

		return team
	} catch (err) {
		console.error(err)

		throw err
	}
}
