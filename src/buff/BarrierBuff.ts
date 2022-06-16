class BarrierBuff extends Buff{
	private _barrier:Barrier
	public constructor(duration:number=3000) {
		super(BuffType.BARRIER, duration, "★")
	}

	public startEffect(owner:BasePlane){	
		this.owner = owner;	
		this._barrier = owner.barrier
		this._barrier.energy = Barrier.MAX_ENERGY
		this._barrier.lock()
		if(this.timer){
			this.timer.start();
		}	
	}

	public delBuff(e:any=null){
		this._barrier.unlock()
		super.delBuff(e)
	}
}