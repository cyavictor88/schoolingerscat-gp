import * as THREE from 'three';
import { simplifyCurve } from '../helper/SimplifyCurve';
import type EventEmitter from 'eventemitter3';

export class FreeDrawLine{
    index:number = 0;
    line:THREE.Line;

    constructor(){
        const geometryBuff = new THREE.BufferGeometry();
        const positionAttribute = new THREE.BufferAttribute(new Float32Array(1000 * 3), 3); // allocate large enough buffer
        positionAttribute.setUsage(THREE.DynamicDrawUsage);
        geometryBuff.setAttribute('position', positionAttribute);
        const materialBuff = new THREE.LineBasicMaterial( {
            color: 0xffffff,
            linewidth: 1,
            linecap: 'round', //ignored by WebGLRenderer
            linejoin:  'round' //ignored by WebGLRenderer
        } );
        this.line = new THREE.Line(geometryBuff, materialBuff);

        // this.line.materialBuff.getAttribute("color").set(new THREE.Color(0xaa0000));

    }
    addPoint(v3:THREE.Vector3) {

        const positionAttribute = this.line.geometry.getAttribute('position');
        positionAttribute.setXYZ(this.index, v3.x, v3.y, v3.z);
        positionAttribute.needsUpdate = true;
        this.index++;
        this.line.geometry.setDrawRange(0, this.index);
    }
    getPoints(){
        const positionAttribute = this.line.geometry.getAttribute('position');
        let points:THREE.Vector2[]=[];
        for (let i=0;i<this.index-1;i++){
            let x= positionAttribute.getX(i)
            let y= positionAttribute.getY(i)
            points.push(  new THREE.Vector2(x,y))
        }
        return points;

    }

}


export class FreeDrawLines{
    freeDrawLines: FreeDrawLine[];
    handLine:FreeDrawLine;
    betterLines: FreeDrawLine[]=[];
    currentFreeDrawLine!: FreeDrawLine;
    scene:THREE.Scene;
    refCurrent: HTMLDivElement;
    canvasSize: any;
    camera:THREE.Camera;
    trackMouse:boolean;
    eventBroker: EventEmitter;
    constructor(scene:THREE.Scene,camera:THREE.Camera,canvasSize:any,refCurrent:HTMLDivElement,eventBroker: EventEmitter ){
        this.scene=scene;
        this.freeDrawLines = [];
        this.trackMouse = false;
        this.handLine = new FreeDrawLine();
        this.scene.add(this.handLine.line);
        (this.handLine.line.material as any).color.setHex(0x00ff00 );
        (this.handLine.line.material as any).needsUpdate = true;

        this.canvasSize=canvasSize;
        this.refCurrent=refCurrent;
        this.camera=camera;
        this.eventBroker = eventBroker;
    
        this.eventBroker.on("hello",(data)=>{console.log("free lines",data)});


        window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        // window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

        // this.eventBroker.on("mouseMove",(event)=>{ this.onMouseMove(event); });

        const mm = (eve:any)=>{
            this.onMouseMove(eve);
        }
        const mm2 = this.onMouseMove.bind(this);
        this.eventBroker.on("mouseMove",mm2);
        // this.eventBroker.removeListener("mouseMove",mm2);

        this.eventBroker.on("butt", ()=>{console.log(this.freeDrawLines.length)} )

    }
    getdisposeSecondToLast(){
        const disposeIndex = this.freeDrawLines.length-2;
        return disposeIndex;
    }
    disposeSecondToLast(){
        const disposeIndex = this.freeDrawLines.length-2;
        console.log(this.freeDrawLines.length)
        if (disposeIndex<0)return;
        alert(this.freeDrawLines.length+" "+disposeIndex);
        
        const disposeLine = this.freeDrawLines[disposeIndex];

        const newLines = [];
        for (let index = 0; index < this.freeDrawLines.length; index++) {
            if(index!=disposeIndex){
                newLines.push(this.freeDrawLines[index])
            }
        }
        this.freeDrawLines = newLines;

        // const disposeLine = this.freeDrawLines.splice(disposeIndex,1)[0];
        // alert(this.freeDrawLines.length+" "+disposeIndex);
        // disposeLine.line
        disposeLine.line.removeFromParent();
        disposeLine.line.geometry.dispose();
        if (disposeLine.line.material) {
            if (disposeLine.line.material instanceof Array) 
            disposeLine.line.material.forEach(material => material.dispose());
            else disposeLine.line.material.dispose();
        }
    }

    addBetterLine(points:THREE.Vector2[]){
        const line = new FreeDrawLine()
        this.betterLines.push(line);
        this.scene.add(line.line);
        (line.line.material as any).color.setHex(0x000000 );
        for (let index = 0; index < points.length; index++) {
            const p = points[index];
            if(p)
            line.addPoint(new THREE.Vector3(p.x,p.y,0))
        }
    }

    addLine(){
        const line = new FreeDrawLine()
        this.freeDrawLines.push(line);
        this.currentFreeDrawLine = line;
        this.scene.add(line.line);
        (line.line.material as any).color.setHex(0x000000 );
        (line.line.material as any).needsUpdate = true;
    }
    addLineWithPoints(points:THREE.Vector2[]){
        const line = new FreeDrawLine()
        this.freeDrawLines.push(line);
        this.currentFreeDrawLine = line;
        this.scene.add(line.line);
        (line.line.material as any).color.setHex(0x000000 );
        (line.line.material as any).needsUpdate = true;
        for (let index = 0; index < points.length; index++) {
            const p = points[index];
            if(p)
            line.addPoint(new THREE.Vector3(p.x,p.y,0))
        }

    }

     onMouseDown(eve: any) {
        const event = eve;// as MouseEvent<HTMLCanvasElement>
        console.log(event.button);

        this.addLine();
        // this.currentFreeDrawLine.addPoint(this.getIntersect(event));

        this.handLine.addPoint(this.getIntersect(event));


        // window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.trackMouse=true;

    }
     onMouseUp(eve: any) {
        const event = eve;// as MouseEvent<HTMLCanvasElement>
        console.log(event.button);
        // window.removeEventListener('mousemove', this.onMouseMove.bind(this));
        this.trackMouse=false;

        // let points: THREE.Vector2[] = this.currentFreeDrawLine.getPoints();
        // this.addLineWithPoints(simplifyCurve(points, 0.1));
        // this.disposeSecondToLast();

        let points: THREE.Vector2[] = this.handLine.getPoints();
        this.addBetterLine(simplifyCurve(points, 0.1));
        // this.betterLines[0].line.scale.set(3,3,3);
        this.scene.remove(this.handLine.line);
        this.handLine.line.removeFromParent();
        this.handLine.line.geometry.dispose();
        if (this.handLine.line.material) {
            if (this.handLine.line.material instanceof Array) 
            this.handLine.line.material.forEach(material => material.dispose());
            else this.handLine.line.material.dispose();
        }
        this.handLine = new FreeDrawLine();
        this.scene.add(this.handLine.line);
        (this.handLine.line.material as any).color.setHex(0xff00ff );
        (this.handLine.line.material as any).needsUpdate = true;
    }

     onMouseMove(eve: any) {
        if(!this.trackMouse)return;
        const event = eve //as MouseEvent<HTMLCanvasElement>
        console.log(event.button);
        // this.currentFreeDrawLine.addPoint(this.getIntersect(event))

        this.handLine.addPoint(this.getIntersect(event));


    }

    /* Get the intersection point where the ray intersects the plane */
     getIntersect(event: any) {

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        mouse.x = ((event.clientX-this.refCurrent.getBoundingClientRect().left) / this.canvasSize.w) * 2 - 1;
        mouse.y = -((event.clientY -this.refCurrent.getBoundingClientRect().top) / (this.canvasSize.h)) * 2 + 1;

        var normal = new THREE.Vector3(0, 0, 1);
        /* Create a plane */
        var planeGround = new THREE.Plane(normal, 0);

        /* The position where a ray emitted from the camera is clicked by the mouse */
        raycaster.setFromCamera(mouse, this.camera);
        /* Get rays */
        var ray = raycaster.ray;
        let intersect = new THREE.Vector3();
        /* Calculate the object from the camera to the ray, there may be multiple objects, return an array, arranged according to the distance from the camera */
        ray.intersectPlane(planeGround, intersect);

        /* return vector */
        return intersect;

    }

}