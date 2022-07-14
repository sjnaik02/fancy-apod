<script>
  import { onMount } from "svelte";
  import { findDate } from "./functions";
  let data = '';
  async function getApod(){
    const res = await fetch(`https://apod.ellanan.com/api?date=${findDate()}`);
    data = await res.json();
    console.log(data);
    return data;
  }
  let promise = getApod();
  onMount(() => getApod());
</script>

{#await promise}
  <h2> Loading....</h2> 
{:then data} 
  <div class="wrapper" style="background-image: url({data.hdurl}), url({data.url});">
    <h2>{data.title}</h2>
    <div class="title-bar">
      <h1>Astronomy Picture of the Day</h1>
    </div>
    <p>{data.explanation}</p>
  </div>
{/await}

<style>
  .wrapper{
    height: 100vh;
    width: 100vw;
    background-color: #000;
    background-position: center;
    background-size: cover;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: 5rem repeat(5, 1fr);
    place-content: center;
  }
  .title-bar{
    padding: 0 1rem 0 1rem;
    width: 3rem;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid white;
    grid-row: 1 / span 13;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  h1{
    font-family: monospace;
    color: #fff;
    writing-mode: vertical-rl; 
    transform: rotate(180deg);
  }
  h2{
    margin: 1.5rem;
    font-family: sans-serif;
    color: #fff;
    grid-row: 4 / span 2;
    grid-column: 2 / span 2;
    font-size: 3.75rem;
    width: 75%;
  }
  p{
    padding: 1rem;
    color: #fff;
    font-family: monospace;
    font-size: 16px;
    text-align: center;
    grid-column: 2 / span 5;
    grid-row: 10 / 13;
    overflow-y: scroll;
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    margin-bottom: 0;
    border-top: solid 1px #fff;
    border-left: solid 1px #fff;
  }
  
</style>
