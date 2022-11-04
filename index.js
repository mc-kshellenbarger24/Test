import * as THREE from 'three';
import FPSCam from "./js/FPSCam.js"
import {Room,Scene} from './js/Scene.js';
import Stats from "three/stats"




const stats = Stats()
document.body.appendChild(stats.dom)




const STEPS_PER_FRAME = 5;
const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer( { 
    canvas:document.getElementById("Game"),
    antialias: true 
} );

renderer.setSize( window.innerWidth, window.innerHeight );


const camera = new FPSCam(70, window.innerWidth / window.innerHeight, 0.01, 10000)
camera.Initialize()

const scene = new Scene();
const FirstRoom = new Room(true)
const SecondRoom = new Room(false)

FirstRoom.AddCube()

scene.Initialize([FirstRoom,SecondRoom])


window.addEventListener( 'resize', onWindowResize );


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function tick() {
    const deltaTime = Math.min( 0.05, clock.getDelta() ) / STEPS_PER_FRAME;
    for ( let i = 0; i < STEPS_PER_FRAME; i ++ ) {
        camera.Update(deltaTime)
        scene.Update(deltaTime)
    }
    stats.update()
    
    renderer.render( scene, camera );
    requestAnimationFrame(tick)
}
tick()

