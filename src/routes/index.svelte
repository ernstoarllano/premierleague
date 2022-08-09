<script>
  import { onMount } from 'svelte'
  import { getStandings,standings } from '../stores'

  onMount(async () => {
    await getStandings()
  })
</script>

<main>
  <section>
    <div>
      {#each $standings as standing}
        <div>
          <h2>{standing.team}</h2>
        </div>
      {/each}
    </div>
  </section>
</main>
