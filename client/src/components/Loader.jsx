import React from 'react'

function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
  <div class="text-center">
  <div
    class="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
  ></div>
  <h2 class="text-zinc-900 dark:text-white mt-4">Loading...</h2>
  <p class="text-zinc-600 dark:text-zinc-400">
    Content is being loaded
  </p>
</div>
</div>

  )
}

export default Loader