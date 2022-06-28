/**敌人子弹 */
class EnemyBullet extends Bullet{
	public static range = 2000	
	public constructor() {		
		super(20, 0xC71585, 0, 20, EnemyBullet.range);
	}

	public static pool:Pool<EnemyBullet> = new Pool<EnemyBullet>(()=>{
		let b = new EnemyBullet()
		EnemyBullet.allArr.push(b);
		return b;
	})

	public static allArr:EnemyBullet[] = []
}