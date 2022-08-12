<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import Loading from '../../components/Loading.svelte'
	import { fetchTeam,isLoading,team } from './../../stores/teamStore'

  onMount(async () => {
    const { params } = $page

    await fetchTeam(params.name)
  })
</script>

{#if $isLoading}
  <Loading />
{:else}
  <h1>{$team[0].team.name}</h1>
{/if}