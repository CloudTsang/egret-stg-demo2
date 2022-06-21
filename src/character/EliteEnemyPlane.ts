class EliteEnemyPlane extends EnemyPlane{
	protected _type = 2
	public constructor(pw:number = 30, ph:number = 50, apear:0|90|180|270=180) {
		super(pw, ph, apear, 2)
		this.maxHP = 8;
		this.HP = 8;
		this.gears = WorldData.SPEED.EliteEnemyPlane
		this.shotSpeed = 550;
		this.shotTimer.delay = this.shotSpeed	
		this._score = 300	
	}

}