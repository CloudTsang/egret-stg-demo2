class SubPlaneBuff extends Buff {
	private _subA:SubPlane
	private _subB:SubPlane
	public constructor(duration:number = -1) {
		super(BuffType.SUB_PLANE, duration, 'S');
	}

	public startEffect(owner:BasePlane){
		super.startEffect(owner);
		this.owner = owner;	
		this._subA = new SubPlane(owner, "LEFT");
		this._subB = new SubPlane(owner, "RIGHT");		
	}

	public delBuff(e:any=null){
		this._subA.dispose();
		this._subB.dispose();
		super.delBuff(e);
	}
}