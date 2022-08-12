<script>
	import { onMount } from 'svelte'
	import { fetchStandings,isLoading,standings } from '../stores/standingsStore'
	import { slug } from '../utils/slug'
	import Loading from './Loading.svelte'

  onMount(async () => {
    await fetchStandings()
  })

</script>

<div class='space-y-6'>
  {#if $isLoading}
    <Loading />
  {:else}
    <div class='flex flex-row flex-no-wrap items-center justify-end'>
      <span class='flex flex-row flex-none items-center justify-center'></span>
      <span class='flex flex-row flex-none items-center justify-center w-16'>P</span>
      <span class='flex flex-row flex-none items-center justify-center w-16'>GD</span>
      <span class='flex flex-row flex-none items-center justify-center w-16'>PTS</span>
    </div>
    {#each $standings as standing}
      <div class='flex flex-row flex-no-wrap items-center justify-between pb-6 border-b-2 border-solid border-gray-200 last:border-b-0'>
        <span class='flex flex-row flex-none items-center w-4'>{standing.rank}</span>
        <span class='flex flex-row flex-1 items-center ml-6 space-x-3'>
          <a class='flex items-center space-x-3' href={`/team/${slug(standing.team.name)}`}>
            <img class='w-8 h-8' src={standing.team.logo} alt={standing.team.name} />
            <span>{standing.team.name}</span>
          </a>
        </span>
        <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.all.played}</span>
        <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.goalsDiff}</span>
        <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.points}</span>
      </div>
    {/each}
  {/if}
</div>