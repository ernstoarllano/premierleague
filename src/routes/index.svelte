<script>
  import Standings from '../components/Standings.svelte'
  import Table from '../components/Table.svelte'

  const year = new Date().getFullYear()
  const season = year + '-' + (year + 1)
</script>

<svelte:head>
  <title>{season} Premier League Standings</title>
</svelte:head>

<Table>
  <Standings />
</Table>