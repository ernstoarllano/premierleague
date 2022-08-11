<div class='table'>
  <slot></slot>
</div>

<style>
  @tailwind base;

  @layer base {
    .table {
      @apply relative w-full max-w-4xl mx-auto py-8 pl-12 pr-8 bg-white shadow-2xl;
    }

    .table::before {
      @apply content-[''] absolute top-0 bottom-0 left-0 w-[10px] h-full bg-primary bg-gradient-0 from-primary to-accent;
    }
  }
</style>