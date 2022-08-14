<script>
	import { page } from '$app/stores'
	import { onMount } from 'svelte'
	import Loading from '../../components/Loading.svelte'
	import Table from '../../components/Table.svelte'
	import { fetchTeam,isLoading,team } from './../../stores/teamStore'

  onMount(async () => {
    const { params } = $page

    await fetchTeam(params.name)
  })
</script>

<Table>
  {#if $isLoading}
    <Loading />
  {:else}
    <h1 class='text-4xl font-bold'>{$team.name}</h1>
  {/if}
</Table>