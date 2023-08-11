<script lang='ts'>
  import Scrollspy from "./Scrollspy.svelte";
</script>


<Scrollspy>
  <section id='s1' />
  <section id='s2' />
  <section id='s3' />

</Scrollspy>


<style>
  section {
    height: 80vh;
    background-color: green;
    margin: 10px;   
  }
</style>