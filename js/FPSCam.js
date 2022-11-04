import * as THREE from 'three';
import InputControllor from './InputContollor.js';
import {clamp} from "./MathUtils.js"

export default class FPSCam {
    constructor(cama){
        this.cam = cama
        this.Input = new InputControllor()
        this.Rotation = new THREE.Quaternion()
        this.Translateion =  new THREE.Vector3()
        this.Phi = 0
        this.Theta = 0
    }

    UpdateRotation(){

        const Xh = this.Input.Current.MouseXDelta / window.innerWidth
        const Yh = this.Input.Current.MouseYDelta / window.innerHeight
    
        this.Phi += -Xh * 5

        this.Theta = clamp(this.Theta + -Yh * 5,-Math.PI/3,Math.PI/3)

        const Qx = new THREE.Quaternion()
        Qx.setFromAxisAngle(new THREE.Vector3(0,1,0),-Xh)
        
        const Qz = new THREE.Quaternion()
        Qz.setFromAxisAngle(new THREE.Vector3(1,0,0),Yh)
        

        const Q = new THREE.Quaternion()
        Q.multiply(Qx)
        Q.multiply(Qz)

        this.Rotation.copy(Q)
    }
    
    UpdateCam(){
        
        this.cam.quaternion.copy(this.Rotation)
    }
    Update(){
        this.UpdateRotation()
        this.UpdateCam()

        
    }
}





