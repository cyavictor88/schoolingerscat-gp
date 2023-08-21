import { mathGeo } from '$lib/components/Pixi/mathGeo';
import { mathmesh2D } from '$lib/mathmesh/mathmesh';
import * as PIXI from 'pixi.js';


export async function pissy( width?:number, height?:number):Promise<PIXI.Application<HTMLCanvasElement>>{
  let app = new PIXI.Application<HTMLCanvasElement>({
    width: width || 400,
    height: height || 400,
    background: '#123456',
    backgroundAlpha: 0,
  });

  let xAxis = new PIXI.Graphics();
  // xAxis.position.set(10,200);
  xAxis.lineStyle(2,0xaaee).moveTo(10,200).lineTo(100,200);
  app.stage.addChild(xAxis);


    const text = new PIXI.Text('X', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xff1010,
      align: 'center',
  });

  text.position.set(110,188);
  app.stage.addChild(text);


  // Create the PixiJS mesh using the geometry and material
  const mesh2d = await mathGeo('\\vec{a}');
  mesh2d.x = 100;
  mesh2d.scale.set(1,1);
  app.stage.addChild(mesh2d);


  return app;

}