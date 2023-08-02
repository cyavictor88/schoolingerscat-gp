<script lang="ts">
	import { onMount } from 'svelte';
	import * as PIXI from 'pixi.js';
	import { mathmesh2D } from '$lib/mathmesh/mathmesh';

	let div: HTMLDivElement;
	onMount(() => {
		async function initPixi() {
			let app = new PIXI.Application<HTMLCanvasElement>({
				width: 640,
				height: 360,
				background: '#1099bb'
			});
			div.appendChild(app.view);

			const m2d = await mathmesh2D('\\sum_{n=1}^{\\infty} 2^{-n} = 1');
			const geometry2d = new PIXI.Geometry()
				.addAttribute('aVertexPosition', m2d.aVertexPosition, 2)
				.addAttribute('aTextureCoord', m2d.aTextureCoord, 2)
				.addIndex(m2d.indices);
			// Create a green color for the square
			const blackColor = new PIXI.MeshMaterial(PIXI.Texture.WHITE, {
				tint: 0x00ff00 // Green color
			});

			// Create the PixiJS mesh using the geometry and materippaal
			const mesh2d = new PIXI.Mesh(geometry2d, blackColor);

			mesh2d.x = 100;
			app.stage.addChild(mesh2d);
			const mathmeshGraphics = new PIXI.Graphics();
			mathmeshGraphics.beginFill(0xff0000);
			m2d.triangles.forEach((tri: number[][]) => {
				mathmeshGraphics.moveTo(tri[0][0], tri[0][1]);
				mathmeshGraphics.lineTo(tri[1][0], tri[1][1]);
				mathmeshGraphics.lineTo(tri[2][0], tri[2][1]);
				mathmeshGraphics.lineTo(tri[0][0], tri[0][1]);
			});
			mathmeshGraphics.endFill();
			app.stage.addChild(mathmeshGraphics);

			mathmeshGraphics.y = 300;
		}

		initPixi();

		return () => {
			if (div.firstChild) div.removeChild(div.firstChild);
		};
	});
</script>

<h1>pixi with mathmesh</h1>

<div bind:this={div} />
