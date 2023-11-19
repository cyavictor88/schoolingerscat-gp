import { fabric } from "fabric";

export class FabricLinTrans {
  canvas: fabric.Canvas;

  constructor(svelteCanvas:HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(svelteCanvas, { width: 300, height: 150 });
    this.setupShapes();
  }

  private setupShapes() {
    const blueEllipse = new fabric.Ellipse({
      left: 50,
      top: 25,
      fill: 'rgba(0,0,255,0.4)',
      rx: 25,
      ry: 50,
    });

    const redEllipse = new fabric.Ellipse({
      left: 200,
      top: 25,
      fill: 'rgba(255,0,0,0.4)',
      rx: 25,
      ry: 50,
    });

    const TxDot = new fabric.Circle({
      left:221,
      top:68,
      fill:'black',
      radius: 2
    });

    const xDot = new fabric.Circle({
      left:70,
      top:68,
      fill:'black',
      radius: 2
    })

    const triangle = new fabric.Triangle({
      width: 10, 
      height: 15, 
      fill: 'black', 
      left: 220, 
      top: 65,
      angle: 90
  });

  const line = new fabric.Line([50, 100, 190, 100], {
      left: 75,
      top: 70,
      stroke: 'black'
  });

    const T = new fabric.Text('A', {
      left: 140,
      top: 50,
      fontSize: 16,
      fontFamily: 'Arial',
      selectable: false,
    });

    const V = new fabric.Text('V', {
      left: 70,
      top: 10,
      fontSize: 16,
      fontFamily: 'Arial',
      selectable: false,
    });

    const W = new fabric.Text('W', {
      left: 218,
      top: 10,
      fontSize: 16,
      fontFamily: 'Arial',
      selectable: false,
    });

    const x = new fabric.Text('p', {
      left: 62,
      top: 63,
      fontSize: 12,
      fontFamily: 'Arial',
      selectable: false,
    });

    const Tx = new fabric.Text('A(p)', {
      left: 225,
      top: 63,
      fontSize: 12,
      fontFamily: 'Arial',
      selectable: false,
    });


    this.canvas.add(blueEllipse, redEllipse, triangle, line, T,x,Tx,TxDot,xDot,V,W);
  }

  clearCanvas() {
    this.canvas.clear();
    this.canvas.dispose();
  }
}

