<script>
  import { onMount } from "svelte";
  import { findDate } from "./functions";
  import LoadingScreen from "$lib/LoadingScreen.svelte";
  let data = "";
  let pageIndex = 0;
  async function getApod() {
    const res = await fetch(
      `https://apod.ellanan.com/api?date=${findDate(pageIndex)}`
    );
    data = await res.json();
    return data;
  }
  let promise = getApod();
  onMount(() => getApod());
  function handleDecrement() {
    pageIndex = pageIndex - 1;
    promise = getApod();
  }
  function handleIncrement() {
    pageIndex = pageIndex + 1;
    promise = getApod();
  }
  function handleKeydown(e) {
    if (e.key == "ArrowLeft") {
      handleDecrement();
    } else if (e.key == "ArrowRight") {
      handleIncrement();
    }
  }
  $: console.log(data);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<svelte:window on:keydown={handleKeydown} />
{#await promise}
  <LoadingScreen />
{:then data}
  <div
    class="wrapper"
    style="background-image: url({data.hdurl}), url({data.url});"
  >
    <div class="title-bar">
      <h1>Astronomy Picture of the Day</h1>
    </div>
    <div class="content">
      <!-- if data.media_type is video, render an error message -->
      {#if data.media_type == "video"}
        <h2 class="error">
          Sorry, this web app is unable to render video currently
        </h2>
      {:else}
        <article>
          <h2>{data.title}</h2>
          <p>{data.date}</p>
          <p>{data.explanation}</p>
        </article>
      {/if}

      <div class="nav-buttons">
        <button id="decrement" on:click={handleDecrement}> &lt; </button>
        <div class="line" />
        <button
          id="increment"
          on:click={handleIncrement}
          disabled={data.date == new Date().toISOString().slice(0, 10)}
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
{/await}

<style>
  :global(body) {
    background-color: #0e0e0e;
  }
  .wrapper {
    height: 100vh;
    width: 100vw;
    background-color: #000;
    background-position: center;
    background-size: cover;
    display: grid;
    grid-template-columns: 5rem 1fr;
  }
  .title-bar {
    padding: 0 1rem 0 1rem;
    width: 3rem;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid white;
    background-color: rgba(0, 0, 0, 0.5);
    grid-column: 1;
  }
  .error {
    color: white;
    font-family: "Space Grotesk", sans-serif;
    font-size: 1.5rem;
    text-align: center;
  }
  .content {
    grid-column: 2;
    height: 100vh;
    width: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-columns: 3fr 3fr 0.5fr;
    align-items: center;
    justify-content: center;
    grid-template-rows: 100vh;
  }
  .nav-buttons {
    grid-column: 3;
    justify-self: right;
    display: flex;
    flex-direction: column;
  }
  .line {
    background-color: white;
    height: 1px;
    width: 2.5rem;
  }
  h1 {
    font-family: "Anton", sans-serif;
    color: #fff;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    letter-spacing: 0.3rem;
    font-size: 2.5rem;
  }
  h2 {
    font-family: "Space Grotesk", sans-serif;
    color: #fff;
    font-size: 2rem;
  }
  p {
    color: #fff;
    font-family: "Space Grotesk", sans-serif;
    font-size: 1rem;
  }
  article {
    padding: 1.5rem;
    grid-column: 2;
    justify-self: center;
    margin-left: 2rem;
  }
  #increment,
  #decrement {
    background-color: rgba(0, 0, 0, 0);
    font-size: 2.5rem;
    color: yellow;
    outline: none;
    border: 0;
    text-align: end;
    padding-right: 3rem;
    width: fit-content;
  }

  @media (max-width: 800px) {
    .wrapper {
      grid-template-rows: 5rem 1fr;
      grid-template-columns: 1fr;
      overflow: scroll;
    }
    .title-bar {
      grid-row: 1;
      width: 100vw;
      height: 3rem;
      margin-bottom: 1px solid white;
      padding: 1rem 0 1rem 0;
      border: none;
    }
    .content {
      grid-row: 2;
      grid-column: 1;
      display: flex;
      flex-direction: column;
      height: auto;
      justify-content: space-between;
      padding-top: 2rem;
    }
    .nav-buttons {
      grid-column: 1;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100vw;
      margin-bottom: 1rem;
      max-width: 100vw;
    }
    .line {
      width: 1px;
      height: 2.5rem;
    }
    h1 {
      font-size: 1.5rem;
      transform: rotate(0deg);
      writing-mode: horizontal-tb;
      margin: 1rem 1rem 0 1rem;
      letter-spacing: 4px;
    }
    h2 {
      margin: 1rem 0;
    }
    article {
      margin: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: clamp(35ch, 90%, 65ch);
    }
    #increment,
    #decrement {
      text-align: center;
    }
  }
</style>
