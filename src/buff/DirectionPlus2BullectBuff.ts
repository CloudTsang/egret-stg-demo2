class DirectionPlus2BullectBuff extends Buff {
	public constructor(duration:number = -1) {
		super(BuffType.BULLECT_BOOST_PLUS2DIRECT, duration, '+2');
	}
	public startEffect(owner:BasePlane){
		super.startEffect(owner);
		this.owner = owner;
		if(owner.bulletDirections.length == 1){
			owner.bulletDirections = [-45, 0, 45]
		}else if(owner.bulletDirections.length == 3){
			owner.bulletDirections = [-135, -45, 0, 45, 135]
		}
		super.startEffect(owner)
	}

	public delBuff(e:any=null){
		let p:BasePlane = this.owner;	
		if(p.bulletDirections.length == 5){
			p.bulletDirections = [-45, 0, 45]
		}else if(p.bulletDirections.length == 3){
			p.bulletDirections = [0]
		}
		super.delBuff(e)
	}
}