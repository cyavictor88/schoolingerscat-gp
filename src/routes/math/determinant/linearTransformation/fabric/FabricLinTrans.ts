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
      fill: 'blue',
      rx: 25,
      ry: 50,
    });

    const redEllipse = new fabric.Ellipse({
      left: 200,
      top: 25,
      fill: 'red',
      rx: 25,
      ry: 50,
    });

    const arrow = new fabric.Path('M 50 150 L 250 150', {
      fill: '',
      stroke: 'black',
      strokeWidth: 2,
      selectable: false,
    });

    // Add LaTeX math text on top of the arrow
    const latexText = new fabric.Text('T(x)', {
      left: 140,
      top: 130,
      fontSize: 16,
      fontFamily: 'Arial',
      selectable: false,
    });

    this.canvas.add(blueEllipse, redEllipse, arrow, latexText);
  }

  clearCanvas() {
    this.canvas.clear();
    this.canvas.dispose();
  }
}

