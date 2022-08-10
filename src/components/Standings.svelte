<script lang="ts" context="module">
  export type Standing = {
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
</script>

<script lang="ts">
  export let standings: Standing[]
</script>

<div>
  {#each standings as standing}
    <div class='flex flex-row flex-no-wrap items-center justify-between pb-6 border-b-2 border-solid border-gray-200 last:border-b-0'>
      <span class='flex flex-row flex-none items-center w-4'>{standing.rank}</span>
      <span class='flex flex-row flex-1 items-center ml-6 space-x-3'>
        <img class='w-8 h-8' src={standing.team.logo} alt={standing.team.name} />
        <span>{standing.team}</span>
      </span>
      <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.all.played}</span>
      <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.goalsDiff}</span>
      <span class='flex flex-row flex-none items-center justify-center w-16'>{standing.points}</span>
    </div>
  {/each}
</div>