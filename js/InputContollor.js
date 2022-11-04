
export default class InputControllor{
    constructor(){
        this.Initialize()

    }
    
    Initialize(){
        this.Current = {
            LeftButton:false,
            RightButton:false,
            MouseX:0,
            MouseY:0
        }
        this.Keys = {}
        document.body.addEventListener("mousedown",(e) => this.OnMouseDown(e),false)
        document.body.addEventListener("mouseup",(e) => this.OnMouseUp(e),false)
        document.body.addEventListener("mousemove",(e) => this.OnMouseMove(e),false)
        document.body.addEventListener("keydown",(e) => this.OnKeyDown(e),false)
        document.body.addEventListener("keyup",(e) => this.OnKeyUp(e),false)
    }

    key(KeyCode){
        if(this.Keys != null){
            return this.Keys[KeyCode]
        }
    }

    OnMouseDown(e){
        document.body.requestPointerLock();
        switch (e.button){
            case 0:{
                this.Current.LeftButton = true
                break
            }
            case 2:{
                this.Current.RightButton = true
                break
            }
        }
    }
    
    OnMouseUp(e){
        switch (e.button){
            case 0:{
                this.Current.LeftButton = false
                break
            }
            case 2:{
                this.Current.RightButton = false
                break
            }
        }
    }

    OnMouseMove(e){
        this.Current.MouseX = e.movementX
        this.Current.MouseY = e.movementY
    }

    OnKeyDown(e){
        this.Keys[e.key] = true
    }
    OnKeyUp(e){
        this.Keys[e.key] = false
    }
}