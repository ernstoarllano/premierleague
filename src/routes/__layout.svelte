<svelte:head>
  <script defer data-domain="premierleague.vercel.app" src="https://plausible.io/js/plausible.js"></script>
</svelte:head>

<slot />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
	  font-family: 'Premier League Bold';
	  src: url('/premier-league-bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Premier League Regular';
    src: url('/premier-league-regular.woff2') format('woff2');
  }

  @layer base {
    body {
      @apply font-premier-league-bold bg-primary bg-gradient-90 from-primary to-accent;
    }
  }
</style>