class BoostBuff  extends Buff{
	private _add:number = 8
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
	}

	public delBuff(e:any=null){
		// console.log("lose spd")
		const tmp = this._add
		let p:BasePlane = this.owner
		for(let i=0; i<p.gears.length; i++){
			p.gears[i] -= tmp
		}
		super.delBuff(e)
	}
}