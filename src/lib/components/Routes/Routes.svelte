<script lang="ts">
	import { routes } from './routes';
	import Route from './Route.svelte';
	let open = false;
	function toggleOpen() {
		open = !open;
	}
	function click(i: number) {
		alert(routes.label);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='dropdown'  tabindex="0" role="button" aria-pressed="false">
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<p on:click={toggleOpen}>index&blacktriangledown;</p>
  
	{#if open}
  <div class='dropdown-content'>
    <div id='close' on:click={toggleOpen}><p>X</p></div>
		<Route {...routes} indent={12} />
  </div>
	{/if}
</div>

<style>
	p {
		margin: 0px;
	}
	.dropdown {
		background-color: aqua;
		border-radius: 10px;
		cursor: pointer;
		padding: 4px;
		border: 1px aqua solid;
	}
  .dropdown-content {
    display: block;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 2;
}
	div:hover {
		border: 1px black solid;
	}

  #close:hover {
    border: none;
  }
  #close {
    width: 100%;
  }

  #close p {
    float: right;
  }
</style>
