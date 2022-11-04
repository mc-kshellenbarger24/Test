export default class InputControllor{
    constructor(){
        this.Initialize()
    }
    Initialize(){
        this.Current = {
            LeftButton:false,
            RightButton:false,
            MouseX:0,
            MouseY:0,
            MouseXDelta:0,
            MouseYDelta:0
        }
        this.Previous =null;
        this.Keys = {}
        this.PreviousKeys = {}
        document.addEventListener("mousedown",(e) => this.OnMouseDown(e),false)
        document.addEventListener("mouseup",(e) => this.OnMouseUp(e),false)
        document.addEventListener("mousemove",(e) => this.OnMouseMove(e),false)
        document.addEventListener("keydown",(e) => this.OnKeyDown(e),false)
        document.addEventListener("keyup",(e) => this.OnKeyUp(e),false)
    }
    OnMouseDown(e){
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
        this.Current.MouseX = e.pageX - window.innerWidth / 2
        this.Current.MouseY = e.pageY - window.innerHeight / 2
        if(this.Previous === null){
            this.Previous = {...this.Current}
        }
        this.Current.MouseXDelta = this.Current.MouseX - this.Previous.MouseX
        this.Current.MouseYDelta = this.Current.MouseY - this.Previous.MouseY
    }
    OnKeyDown(e){
        this.Keys[e.keyCode] = true
    }
    OnKeyUp(e){
        this.Keys[e.keyCode] = false
    }
    Update(){
        this.Previous = {...this.current}
    }

}