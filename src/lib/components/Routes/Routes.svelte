<script lang='ts'>
  import { routes } from "./routes";
  import Route from "./Route.svelte";
  let open = false;
  function toggleOpen(){
    open = !open;
  }
  function click(i: number){
    alert(routes.label)
  }


</script>


<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={toggleOpen} tabindex="0" role="button" aria-pressed="false">
  <p>index&blacktriangledown;</p>
</div>

{#if open}
<Route {...routes}/>
{/if}

<style>
  p {
    margin: 0px;
  }
  div {
    background-color:aqua;
    border-radius: 10px;
    cursor: pointer;
    padding: 4px;
    border: 1px aqua solid;

  }

  div:hover{
    border: 1px black solid;
  }

</style>

