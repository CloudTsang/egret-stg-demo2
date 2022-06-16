class SubPlane extends BasePlane {
    private _mainPlane:BasePlane;
    private _place:string;

    private _offsetX:number;
    private _offsetY:number;
    private _moveTween:egret.Tween;
    private readonly followDelay:number = 200;
	public constructor(mainPlane:BasePlane, place:"LEFT"|"RIGHT", pw:number=20, ph:number=30) {
		super()
        this.pWidth = pw;
        this.pHeight = ph;
        this.pColor = 0x228B22;
        this.draw();     
        this._mainPlane = mainPlane
        this._place = place;
        if(place == "LEFT"){
            this._offsetX =  - mainPlane.width/2 - this.width - 50;            
        }else{
            this._offsetX =  mainPlane.width/2 + this.width + 50;
        }   
        this._offsetY = mainPlane.height/2 - this.height/2;
        this.x = mainPlane.x + this._offsetX     
        this.y = mainPlane.y + this._offsetY;
        mainPlane.parent.addChild(this)
        mainPlane.addEventListener(PlayEvents.PLAYER_SHOT, this.shot, this);        
        this.bulletGenerator = mainPlane.bulletGenerator;
        this.move()
	}

    protected draw(){
        let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#plane2');
		bmp.width = this.pWidth*4;
		bmp.height = this.pHeight*4;
		bmp.x = -this.pWidth*2;
		bmp.y = -this.pHeight*2;
		this.addChild(bmp);		
    }

    public dispose(){
        if(this._moveTween){
            this._moveTween.pause();
            this._moveTween = null;
        }
        this._mainPlane.removeEventListener(PlayEvents.PLAYER_SHOT, this.shot, this);        
        this.removeChildren();
        this.parent && this.parent.removeChild(this);        
        
    }
  

    public move(){
        const p = this
        const targetX = p._mainPlane.x + p._offsetX;
        const targetY = p._mainPlane.y + p._offsetY;
        p.rotation = p._mainPlane.rotation
        if(targetX == p.x && targetY == p.y){
            p._moveTween =  egret.Tween.get(p).wait(200).call(p.move, p, [0,0]);            
        }else{            
            let obj = {x:targetX, y:targetY};            
            p._moveTween =  egret.Tween.get(p).to(obj, 200).call(p.move, p, [0,0]);
        }    
    }    

    public shot(){ 
        const p = this           
        let b = p.bulletGenerator.getOne()
        b.x = p.x;
        b.y = p.y;                
        b.setDirection(p.rotation)
        p.parent.addChild(b);
        b.shoot()                              
    }
}