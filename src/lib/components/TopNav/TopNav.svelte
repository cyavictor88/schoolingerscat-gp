<!-- TopNavbar.svelte -->
<script lang="ts">
  import { base } from '$app/paths';
	import { topBarHeight } from '$lib/store';
	import { SITE_COLOR } from '$lib/theme/colors';
	import Directory from './Directory.svelte';
</script>

<div class="top-navbar" style="--height: {$topBarHeight}px; --nav-bg-color:{SITE_COLOR.CompTopNavBG};">
	<Directory />
	
	<div class="logo"><a href='{base}/' style="--logo-color:{SITE_COLOR.CompTopNavLogo}">
		<img style="height: 30px; border-radius: 50%;" src="/images/catHead.jpg" alt="" />
		Schoolinger's Cat 
		<img style="height: 30px; border-radius: 50%;" src="/images/catHead.jpg" alt="" />
		</a>
	</div>
</div>

<style>

	.top-navbar {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		border: 1px var(--nav-bg-color) solid;
		/* position: fixed; */
		height: var(--height);
		background-color: var(--nav-bg-color);
		display: flex;
		align-items: center;
		margin: 0;
		width: 100%;
		font-family: "Gill Sans", sans-serif;

	}
	.logo a {
			text-decoration: none;
			color: var(--logo-color);
		}
	.logo {
		flex-grow: 1;
		font-size: 24px;
		font-weight: bold;
		display: flex;
		justify-content: center;
	}

	.logo:hover img {
		/* transition: transform .8s ease-in-out;
		transform: rotate(45deg); */
		animation: rotateAnimation 2s linear infinite; 
	}

	@keyframes rotateAnimation {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-45deg);
  }
	50% {
		transform: rotate(0deg);
	}
	75% {
		transform: rotate(45deg);
	}
  100% {
    transform: rotate(0deg);
  }
}

</style>
