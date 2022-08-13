<svelte:head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-KLPZC7W41M"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-KLPZC7W41M');
  </script>
</svelte:head>

<slot />

<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  @font-face {
	  font-family: 'Premier League Bold';
	  src: url('/static/premier-league-bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Premier League Regular';
    src: url('/static/premier-league-regular.woff2') format('woff2');
  }

  @layer base {
    body {
      @apply font-premier-league-bold bg-primary bg-gradient-90 from-primary to-accent;
    }
  }
</style>