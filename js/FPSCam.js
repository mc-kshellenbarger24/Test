import * as THREE from 'three';
import InputControllor from './InputContollor.js';


export default class FPSCam extends THREE.PerspectiveCamera {
    Initialize(){
        this.Input = new InputControllor()
        this.rotation.order = 'YXZ';
        this.playerDirection = new THREE.Vector3()
        this.Translation = new THREE.Vector3()
        document.addEventListener("mousemove",(e)=>{
            if ( document.pointerLockElement === document.body ) {
                this.rotation.y -= this.Input.Current.MouseX /500
                this.rotation.x -=this.Input.Current.MouseY /500
            }
        })
    }
    getForwardVector() {
        this.getWorldDirection(  this.playerDirection );
        this.playerDirection.y = 0;
        this.playerDirection.normalize();
        return this.playerDirection;

    }

    getSideVector() {
        this.getWorldDirection( this.playerDirection);
        this.playerDirection.y = 0;
        this.playerDirection.normalize();
        this.playerDirection.cross( this.up );
        return  this.playerDirection;
    }

    Update(deltaTime){
        let damping = Math.exp( - 4 * deltaTime ) - 1;
        const Speed = 25
        const ForwardVel = deltaTime * (this.Input.key("w")? Speed: 0) + deltaTime * (this.Input.key("s")? -Speed : 0)
        const StrafVel = deltaTime * (this.Input.key("a")? -Speed : 0) + deltaTime * (this.Input.key("d")? Speed : 0)

        this.Translation.add(this.getForwardVector().multiplyScalar(ForwardVel));
        this.Translation.add(this.getSideVector().multiplyScalar(StrafVel));

        this.position.copy( this.Translation)


    }
}





