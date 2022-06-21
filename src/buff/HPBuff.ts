class HPBuff extends Buff{
	public constructor(duration:number = -1) {
		super(BuffType.HP_RECOVER, duration, "H")		
	}

	public startEffect(owner:BasePlane){
		owner.HP = owner.maxHP
	}

	public delBuff(e:any=null){
	}
}