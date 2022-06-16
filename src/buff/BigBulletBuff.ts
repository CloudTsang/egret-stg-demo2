class BigBulletBuff extends Buff{
	public constructor(duration:number = -1) {
		super(BuffType.BULLET_BOOST_BIG, duration, "B")		
	}

	public startEffect(owner:BasePlane){
		this.owner = owner;
		if(owner instanceof PlayerPlane){
			owner.bulletGenerator = BulletLV2.pool
			owner.bulletRange = BulletLV2.range
		}else{
			owner.bulletGenerator = EnemyBulletLV2.pool
			owner.bulletRange = EnemyBulletLV2.range
		}
		// Bullet.allArr = []
	}

	public delBuff(e:any=null){
		let p:BasePlane = this.owner
		if(p instanceof PlayerPlane){
			p.bulletGenerator = Bullet.pool
			p.bulletRange = Bullet.range
		}else{
			p.bulletGenerator = EnemyBullet.pool
			p.bulletRange = EnemyBullet.range
		}
		
		super.delBuff(e)
		// Bullet.allArr = []
	}
}