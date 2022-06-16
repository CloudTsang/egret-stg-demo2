class PlayerPlane extends BasePlane{
    public dashGauge:DashGauge; 
    private _disp:PlaneDisp   
    public constructor(pw:number = 3, ph:number = 5){
        super()
        this.maxHP = 5;
        this.HP = 5;
        this.pWidth = pw;
        this.pHeight = ph;
        this.pColor = 0x00FF00;
        this.draw();     
        this.barrier.energy = 100
        
        this.bulletDirections = [0]        
        this.bulletGenerator = Bullet.pool;   
        this.bulletRange = Bullet.range      
    }


    protected draw(){
		const t = this
        let disp = new PlaneDisp(0)
        disp.width = t.pWidth*4;
		disp.height = t.pHeight*4;
		disp.x = -t.pWidth*2;
		disp.y = -t.pHeight*2;
        t.addChild(disp);	
        t._disp = disp
    }

     public move(boot:-1|0|1,spin:-1|0|1){
         super.move(boot, spin)
         this._disp.setSpinState(spin)
    }

    public crash(){        
        super.crash();
        this.dispatchEvent(new egret.Event(PlayEvents.GAME_OVER));
    }

    public shot(){
        if(this.shotTimer.running){
            return;
        }     
        super.shot();     
        this.dispatchEvent(new egret.Event(PlayEvents.PLAYER_SHOT));        
    }

}