import * as THREE from 'three';
import FPSCam from "./js/FPSCam.js"
import {Room,Scene} from './js/Scene.js';
import {PointerLockControls} from "three/controls/PointerLockControls.js "


const renderer = new THREE.WebGLRenderer( { 
    canvas:document.getElementById("Game"),
    antialias: true 
} );

renderer.setSize( window.innerWidth, window.innerHeight );

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
const FpsC = new FPSCam(camera)


const controls = new PointerLockControls( camera, document.body );

controls.lock()



const scene = new Scene();
const FirstRoom = new Room(true)
const SecondRoom = new Room(false)

FirstRoom.AddCube()

scene.Initialize([FirstRoom,SecondRoom])




function tick() {
    scene.Update()
    FpsC.Update()
    renderer.render( scene, camera );
    requestAnimationFrame(tick)
}
tick()

