class BoostBuff  extends Buff{
	private _add:number = 8
	private _jet:egret.Bitmap
	public constructor(duration:number = 20000) {
		super(BuffType.HIGH_SPEED, duration, "S")		
	}

	public startEffect(owner:BasePlane){
		this.owner = owner
		const tmp = this._add
		for(let i=0; i<owner.gears.length; i++){
			owner.gears[i] += tmp
		}
		if(this.timer){
			this.timer.start();
		}
		const jetp = this.creatBmp()
		jetp.width = owner.width * 0.2
		jetp.height = jetp.width * 4
		owner.addChild(jetp)
		jetp.x = - jetp.width/2
		jetp.y = jetp.height * 0.3
		this._jet = jetp
	}

	public delBuff(e:any=null){
		// console.log("lose spd")
		const tmp = this._add
		let p:BasePlane = this.owner
		for(let i=0; i<p.gears.length; i++){
			p.gears[i] -= tmp
		}
		if(this._jet && this._jet.parent){
			this._jet.parent.removeChild(this._jet)
		}
		super.delBuff(e)
	}

	private creatBmp(){
		let bmp = new egret.Bitmap(RES.getRes('sheet_json#jetp'))
		return bmp
	}
}