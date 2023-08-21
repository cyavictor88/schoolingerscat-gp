import { mathmesh2D } from '$lib/mathmesh/mathmesh';
import * as PIXI from 'pixi.js';

export async function mathGeo(math: string, color?: number){
  const m2d = await mathmesh2D(math);
  const geometry2d = new PIXI.Geometry()
    .addAttribute('aVertexPosition', m2d.aVertexPosition, 2)
    .addAttribute('aTextureCoord', m2d.aTextureCoord, 2)
    .addIndex(m2d.indices);
  // Create a green color for the square
  const backColor = new PIXI.MeshMaterial(PIXI.Texture.WHITE, {
    tint: color || 0x00ff00 // Green color
  });

  // Create the PixiJS mesh using the geometry and material
  return new PIXI.Mesh(geometry2d, backColor);
}