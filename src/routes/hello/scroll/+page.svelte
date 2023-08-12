<script lang='ts'>
  import Scrollspy from "./Scrollspy.svelte";
</script>

  <Scrollspy>
    <section class='great' id='s1' />
    <section class='large' id='s2' />
    <section class='small' id='s3' />
    <section class='tiny' id='s4' />
    <section class='small' id='s5' />
    <section class='big' id='s6' />
    <section class='half' id='s7' />
    <section class='small' id='s8' />
    <section class='tiny' id='s9' />
  
  </Scrollspy>





<style>

  section {
    background-color: green;
    margin: 10px;   
    display: flex;
	 align-items: flex-end;
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