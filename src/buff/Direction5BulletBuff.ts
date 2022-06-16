class Direction5BulletBuff extends Buff{
	public constructor(duration:number = -1) {
		super(BuffType.BULLET_BOOST_5DIRECT, duration, '+2')		
	}

	public startEffect(owner:BasePlane){
		this.owner = owner;
		owner.bulletDirections = [-135, -45, 0, 45, 135]
	}
}