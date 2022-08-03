class MissleBuff extends Buff{
	public constructor(duration:number = 45000) {
		super(BuffType.MISSLE_BOOST, duration, "M")	
	}

	public startEffect(owner:BasePlane){	
		this.owner = owner;	
		owner.missleLaucher.boost = true
		if(this.timer){
			this.timer.start();
		}	
	}

	public delBuff(e:any=null){
		this.owner.missleLaucher.boost = false
		super.delBuff(e)
	}
}