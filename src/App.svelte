<script>
  import {onMount} from 'svelte'
  let count = 0
  onMount(() => {
    const interval = setInterval(() => count++, 1000)
    return () => {
      clearInterval(interval)
    }
  })
</script>

<div class="text-gray-600 text-xl flex flex-col items-center justify-center h-screen text-center">
  test7
  <img src="/logo.svg" class="animate-bounce h-64 pointer-events-none my-10" alt="logo" />
  <p class="my-1">Edit <code class="bg-gray-200 p-1">src/App.svelte</code> and save to reload.</p>
  <p class="my-1">Page has been open for <code class="bg-gray-200 p-1">{count}</code> seconds.</p>
  <p class="my-4">
    <a class="text-red-500 font-bold flex items-center justify-center gap-2" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
      <span>Learn Svelte</span>

      <svg class="h-8 w-8 mt-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </p>
</div>
