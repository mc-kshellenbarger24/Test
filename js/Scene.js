import * as THREE from 'three';
import {LoopSubdivision} from 'three/subdivide';
import {OBJLoader} from "three/OBJLoader"
import {MTLLoader} from "three/MTLLoader"

class Scene extends THREE.Scene{
    Initialize(Rooms){
        this.Rooms = Rooms
        this.Rooms.forEach(Room=>{
            if(!Room.Enabled) return;
            Room.RoomGroup.position.set(0,0,0)
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
        this.Enabled = Enabled
        this.Loading = false
        this.LoadingError = null
        this.LoadingProgress = 0
        this.Meshs = []
        this.LoadedAssets = []
        this.RoomGroup = new THREE.Group();
        this.LoadingManger = new THREE.LoadingManager()
        this.LoadingManger.onStart = (Url,Item,Total) => this.OnLoadingStart(Url,Item,Total,this)
        this.LoadingManger.onProgress = (Url,Loaded,Total) => this.OnLoadingProgress(Url,Loaded,Total,this)
        this.LoadingManger.onLoad = () => this.OnLoadingLoaded(this)
        this.LoadingManger.onError = (Url) =>  this.OnLoadingError(Url,this)
        this.TextureLoader = new THREE.TextureLoader(this.LoadingManger)
        this.OBJLoader = new OBJLoader(this.LoadingManger)
        this.MTLLoader = new MTLLoader(this.LoadingManger)
    }

    OnLoadingStart(Url,Item,Total,Room){
        Room.Loading = true
        Room.LoadingProgress = (Item/Total) * 100
    }
    
    OnLoadingProgress(Url,Loaded,Total,Room){
        Room.Loading = true
        Room.LoadingProgress = (Loaded/Total) * 100
        Room.LoadedAssets.push({
            Url:Url,
            Loaded:Loaded,
            Total:Total,
        })
    }

    OnLoadingLoaded(Room){
        Room.Loading = false
    }

    OnLoadingError(Url,Room){
        Room.LoadingError = Url
    }
    
    AddCube(){
        if(!this.Enabled) return;
        

        const texture = this.TextureLoader.load( '../assets/Textures/Tiles_048_basecolor.jpg' );
        const textureNormal = this.TextureLoader.load( '../assets/Textures/Normal/Tiles_048_normal.jpg' );
        const textureRoughness = this.TextureLoader.load( '../assets/Textures/Roughness/Tiles_048_roughness.jpg' );
        const textureMetallic = this.TextureLoader.load( '../assets/Textures/Metallic/Tiles_048_metallic.jpg' );
        const textureAO = this.TextureLoader.load( '../assets/Textures/AO/Tiles_048_ambientOcclusion.jpg' );

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set( 4, 4 );

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        light.intensity = 3

        const geometry2 = new THREE.BoxGeometry( 0.1, 4, 0.1);
        const geometry3 = new THREE.BoxGeometry( 0.1, 0.1, 4);
        const geometry4 = new THREE.BoxGeometry( 4, 0.1, 0.1);
        const geometry5 = new THREE.SphereGeometry(0.2,100,100)
        
        const material2 = new THREE.MeshBasicMaterial( { color: "red" } );
        const material3 = new THREE.MeshBasicMaterial( { color: "blue" } );
        const material4 = new THREE.MeshBasicMaterial( { color: "green" } );
        const material5 = new THREE.MeshBasicMaterial( { color: "rgb(0,255,255)" } );

        /*X*/
        const cube4 = new THREE.Mesh( geometry4, material4 );
        cube4.position.set(0,0,0)

        const cube6 = new THREE.Mesh( geometry5, material5 );
        cube6.position.set(1,0,0)

        /*Y*/
        const cube2 = new THREE.Mesh( geometry2, material2 );
        cube2.position.set(0,0,0)
        
        const cube7 = new THREE.Mesh( geometry5, material5 );
        cube7.position.set(0,1,0)


        /*Z*/
        const cube3 = new THREE.Mesh( geometry3, material3 );
        cube3.position.set(0,0,0)

        const cube5 = new THREE.Mesh( geometry5, material5 );
        cube5.position.set(0,0,1)


        const cubeMaterials = [
            new THREE.MeshStandardMaterial({ 
                map: texture
            }), //right side
            
            new THREE.MeshStandardMaterial({ 
                map: texture
            }), //left side
            
            new THREE.MeshStandardMaterial({ 
                map: texture,
                normalMap:textureNormal,
                roughnessMap:textureRoughness,
                metalnessMap:textureMetallic,
                aoMapIntensity:textureAO
            }), //top side
    
            new THREE.MeshStandardMaterial({ 
                map: texture
            }), //bottom side
        
            new THREE.MeshStandardMaterial({ 
                map: texture
            }), //front side
            
            new THREE.MeshStandardMaterial({ 
                map: texture}), //back side
        ];
    

        const Groundgeometry = new THREE.BoxGeometry(40,0.4,40)
        
        const Ground = new THREE.Mesh( Groundgeometry, cubeMaterials );
        Ground.position.set(0,-3,0)


        this.RoomGroup.add(Ground,cube2,cube3,cube4,cube5,cube6,cube7,light)

        this.RoomGroup.children.forEach(Mesh=>{
            this.Meshs.push(Mesh)
        })
    }











    Update(deltaTime){
        if(!this.Enabled) return;
        this.Meshs.forEach(Mesh=>{

        })

    }


}



export {Room,Scene}