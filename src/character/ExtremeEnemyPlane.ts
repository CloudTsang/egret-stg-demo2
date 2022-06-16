class ExtremeEnemyPlane extends EnemyPlane {
	public constructor(pw:number = 30, ph:number = 50, apear:0|90|180|270=180) {
		super(pw, ph, apear);
		this.maxHP = 10;
		this.HP = 10;
		this.gears = [2, 18, 28];
		this.shotSpeed = 350;
		this.shotTimer.delay = this.shotSpeed	
		this._score = 1000	
	}

	public boot(){
       super.boot()
	   this.aiCfg.driftFirst = WorldData.ENEMY_DRIFT
    }

	protected checkShouldShot(){
		this._shouldShot = true;		
	}

	protected draw(){
		const t = this
        let disp = new PlaneDisp(2)
        disp.width = t.pWidth*4;
		disp.height = t.pHeight*4;
		disp.x = -t.pWidth*2;
		disp.y = -t.pHeight*2;
        t.addChild(disp);	
        t._disp = disp	
	}


	public setBuff(ty:BuffType, duration:number){
        super.setBuff(ty, duration)
		if(this.buffManager.buffNum >= 1){
			this.aiCfg.driftFirst = false
		}
    }

    public loseBuff(ty:BuffType){
		super.loseBuff(ty)
        if(this.buffManager.buffNum <= 0){
			this.aiCfg.driftFirst = true
		}
    }
}