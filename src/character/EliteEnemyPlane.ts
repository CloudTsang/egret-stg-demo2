class EliteEnemyPlane extends EnemyPlane{
	public constructor(pw:number = 30, ph:number = 50, apear:0|90|180|270=180) {
		super(pw, ph, apear)
		this.maxHP = 8;
		this.HP = 8;
		this.gears = [8, 14, 20]
		this.shotSpeed = 550;
		this.shotTimer.delay = this.shotSpeed	
		this._score = 300	
	}

	protected checkShouldShot(){
		this._shouldShot = true;		
	}
}