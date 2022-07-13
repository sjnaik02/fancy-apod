<script>
  import { onMount } from "svelte";
  let data = '';
  async function getApod(){
    const res = await fetch("https://apod.ellanan.com/api");
    data = await res.json();
    return data;
  }
  let promise = getApod();
  onMount(() => getApod());
</script>

{#await promise}
  <h2> Loading....</h2> 
{:then data} 
  <div class="wrapper">
    <h1>APOD</h1>
    <img srcset="{data.url} 1x,
                 {data.hdurl} 2x" alt="The APOD."/>
    <p>{data.explanation}</p>
  </div>
{/await}



<style>
  .wrapper{
    height: 100vh;
    width: 100vw;
  }
  h1{
    margin: 0px;
    text-align: center;
    font-family: sans-serif;
    color: black;
    grid-area: a;
  }
  img{
    aspect-ratio: auto;
    width: 40vw;

  }
  p{
    color: black;
    font-family: sans-serif;
    text-align: center;

    margin: 1rem;
  }
  
</style>
