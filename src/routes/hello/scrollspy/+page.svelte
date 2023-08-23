<script lang='ts'>
  import Scrollspy from "./Scrollspy.svelte";
  import url from "$lib/components/Route/url";


  $: if($url && typeof $url !== 'string' ) {
    console.log(($url as URL).hash);
  }
</script>

  <Scrollspy>
    <section class='small'>
      <div>hellow</div>
      </section>
    <section class='large'  />
    <section class='small'  />
    <section class='tiny'><button on:click={()=>{window.location.hash = 'hello'}}>tinyy</button> </section>

    <section class='small'  />
    <section class='big'  />
    <section class='half'  />
    <section class='small'  />
    <section class='tiny'  />
  </Scrollspy>





<style>

  section {
    background-color: green;
    margin: 10px;   
    display: flex;
  }

  .great {
    height: 110vh;
  }

  .large {
    height: 100vh;
  }

  .big {
    height: 80vh;
  }

  .half {
    height: 50vh;
  }

  .small {
    height: 20vh;
  }

  .tiny {
    height: 10vh;
  }
</style>