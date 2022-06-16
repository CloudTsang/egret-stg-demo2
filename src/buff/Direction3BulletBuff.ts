class Direction3BulletBuff extends Buff{
	public constructor(duration:number = -1) {
		super(BuffType.BULLET_BOOST_3DIRECT, duration, "+2")		
	}

	public startEffect(owner:BasePlane){
		this.owner = owner;	
		owner.bulletDirections = [-45, 0, 45]
	}
}