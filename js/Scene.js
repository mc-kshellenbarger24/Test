import * as THREE from 'three';

class Scene extends THREE.Scene{
    Initialize(Rooms){
        this.Rooms = Rooms
        this.Rooms.forEach(Room=>{
            if(!Room.Enabled) return;
            this.add(Room.RoomGroup)
        })
    }

    Update(){
        this.Rooms.forEach(Room=>{
            Room.Update()
            
        })
    }
}

class Room{
    constructor(Enabled){
        this.Meshs = []
        this.Enabled = Enabled
        this.RoomGroup = new THREE.Group();
    }
    AddCube(){
        if(!this.Enabled) return;
        const geometry = new THREE.BoxGeometry( 100, 0.4, 1000);
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.set(0,-3,0)

        this.Meshs.push(cube)
        this.RoomGroup.add(cube)

    }
    Update(){
        if(!this.Enabled) return;
        this.Meshs.forEach(Mesh=>{

        })

    }


}



export {Room,Scene}