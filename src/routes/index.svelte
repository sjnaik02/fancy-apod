<script>
  import { onMount } from "svelte";
  import { findDate } from "./functions";
  import LoadingScreen from "$lib/LoadingScreen.svelte"
  let data = '';
  let pageIndex = 0;
  async function getApod(){
    const res = await fetch(`https://apod.ellanan.com/api?date=${findDate(pageIndex)}`);
    data = await res.json();
    return data;
  }
  let promise = getApod();
  onMount(() => getApod());
  function handleDecrement(){
    pageIndex = pageIndex - 1;
    promise = getApod();
  }
  function handleIncrement(){
    pageIndex = pageIndex + 1;
    promise = getApod();
  }
  function handleKeydown(e){
    if(e.key == "ArrowLeft"){
      handleDecrement();
    } else if (e.key == "ArrowRight"){
      handleIncrement();
    }
  }
  $: console.log(data);
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk&display=swap" rel="stylesheet">
</svelte:head>
<svelte:window on:keydown={handleKeydown}/>
{#await promise}
  <LoadingScreen/>
{:then data} 
  <div class="wrapper" style="background-image: url({data.hdurl}), url({data.url});">
    <div class="title-bar">
      <h1>Astronomy Picture of the Day</h1>
    </div>
    <div class="content">
      <article>
        <h2>{data.title}</h2>
        <p>{data.explanation}</p>
      </article>
      <div class="nav-buttons">
        <button id="decrement" on:click={handleDecrement}> &lt; </button>
        <div class="line" />
        <button id="increment" on:click={handleIncrement} disabled={data.date == new Date().toISOString().slice(0,10)}> &gt; </button>
      </div>
    </div>
  </div>
{/await}

<style>
  :global(body){
    background-color: #0e0e0e;
  }
  .wrapper{
    height: 100vh;
    width: 100vw;
    background-color: #000;
    background-position: center;
    background-size: cover;
    display: grid;
    grid-template-columns: 5rem 1fr;
  }
  .title-bar{
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
  .content{
    grid-column: 2;
    height: 100vh;
    width: auto;
    background-color: rgba(0, 0, 0, 0.5);
    display: grid;
    grid-template-columns: 4fr 3fr 0.75fr;
    align-items: center;
    justify-content: center;
    grid-template-rows: 100vh;
  }
  .nav-buttons{
    grid-column: 3;
    justify-self: right;
    display: flex;
    flex-direction: column;
  }
  .line{
    background-color: white;
    height: 1px;
    width: 2.5rem;
  }
  h1{
    font-family: 'Anton', sans-serif;
    color: #fff;
    writing-mode: vertical-rl; 
    transform: rotate(180deg);
    letter-spacing: 0.3rem;
    font-size: 2.5rem;
  }
  h2{
    font-family: 'Space Grotesk', sans-serif;
    color: #fff;
    font-size: 2rem;
  }
  p{
    color: #fff;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 1rem;
  }
  article{
    padding: 1.5rem;
    grid-column: 2;
    justify-self: center;
    margin-left: 2rem;
  }
  #increment, #decrement{
    background-color: rgba(0, 0, 0, 0);
    font-size: 2.5rem;
    color: yellow;
    outline: none;
    border: 0;
    text-align: end;
    padding-right: 3rem;
    width: fit-content;
  }
  
</style>
