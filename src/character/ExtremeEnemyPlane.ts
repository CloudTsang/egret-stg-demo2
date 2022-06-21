class ExtremeEnemyPlane extends EnemyPlane {
	protected _type = 3
	public constructor(pw:number = 30, ph:number = 50, apear:0|90|180|270=180) {
		super(pw, ph, apear, 3);
		this.maxHP = 10;
		this.HP = 10;
		this.gears = WorldData.SPEED.ExtremeEnemyPlane;
		this.shotSpeed = 350;
		this.shotTimer.delay = this.shotSpeed	
		this._score = 1000	
	}

	public boot(){
       super.boot()
	   this.aiCfg.driftFirst = WorldData.ENEMY_DRIFT
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