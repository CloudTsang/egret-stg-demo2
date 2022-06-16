/**强化子弹 */
class BulletLV2 extends Bullet{	
	public static range = 3000
	public constructor() {
		super(15, 0xFFD700, 0, 40, BulletLV2.range);
		this._barrierDamage = 20  
	}

	protected draw(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#bullet');
		bmp.width = this.size*2;
		bmp.height = this.size*2;
		bmp.x = -this.size
		bmp.y = -this.size;
		this.addChild(bmp);		
		this._sp = bmp;
	}

	public refreshPosition(){
		this.position = new egret.Point(this.x, this.y);
		this._collisionPoints = [new egret.Point(this.x, this.y-this.width), new egret.Point(this.x-this.width, this.y), new egret.Point(this.x+this.width, this.y)];
	}

	public get collisionPoints():egret.Point[]{
		const t = this
		return t._collisionPoints.map((p, i)=>{
			if(!t.parent) return p
			return t.parent.localToGlobal(p.x, p.y)
		});
	}

	public static pool:Pool<BulletLV2> = new Pool<BulletLV2>(()=>{
		let b = new BulletLV2()
		Bullet.allArr.push(b);
		return b;
	})
}

class EnemyBulletLV2 extends BulletLV2{
	public constructor() {
		super();
	}
	public static pool:Pool<EnemyBulletLV2> = new Pool<EnemyBulletLV2>(()=>{
		let b = new EnemyBulletLV2()
		EnemyBullet.allArr.push(b);
		return b;
	})
}