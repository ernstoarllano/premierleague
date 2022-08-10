<script>
  import { onMount } from 'svelte'
  import { currentStandings,getStandings } from '../stores'

  let promise = getStandings()

  onMount(async () => {
    await getStandings()
  })
</script>

<main>
  <img class='fixed top-[15px] right-[15px] z-50 w-20' src='logo.svg' alt='Premier League' />
  <section class='relative w-full max-w-4xl mx-auto py-8 pl-12 pr-8 bg-white shadow-2xl'>
    <div>
      {#await promise}
        <p>Loading...</p>
      {:then}
        {#if $currentStandings}
          <div class='space-y-6'>
            <div class='flex flex-row flex-no-wrap items-center justify-end'>
              <span class='flex flex-row flex-none items-center justify-center'></span>
              <span class='flex flex-row flex-none items-center justify-center w-16'>P</span>
              <span class='flex flex-row flex-none items-center justify-center w-16'>GD</span>
              <span class='flex flex-row flex-none items-center justify-center w-16'>PTS</span>
            </div>
            {#each $currentStandings as standing}
              <div class='flex flex-row flex-no-wrap items-center justify-between pb-6 border-b-2 border-solid border-gray-200 last:border-b-0'>
                <span class='flex flex-row flex-none items-center w-4'>{standing.rank}</span>
                <span class='flex flex-row flex-1 items-center ml-6 space-x-3'>
                  <img class='w-8 h-8' src={standing.logo} alt={standing.team} />
                  <span>{standing.team}</span>
                </span>
                <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.played}</span>
                <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.goalsDiff}</span>
                <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.points}</span>
              </div>
            {/each}
          </div>
        {:else}
          <p>No standings available</p>
        {/if}
      {/await}
    </div>
  </section>
</main>