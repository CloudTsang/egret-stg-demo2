/**普通子弹*/
class Bullet extends CollisionObject implements IPoolObject{		
	protected size;
	protected color;
	protected moveData:MoveData
	private _stage = egret.MainContext.instance.stage;

	/**子弹飞行距离 */
	protected distance:number
	protected curDis:number

	/**对机体伤害 */
	protected _planeDamage:number
	/**对护盾伤害 */
	protected _barrierDamage:number

	protected _sp:egret.DisplayObject;
	protected _blastBmp:egret.Bitmap;
	protected _blastPartical:particle.GravityParticleSystem

	protected _collisionPoints:egret.Point[]
	public activate:boolean = false;	
	
	public static range = 2000

	public constructor(size=20, color=0xFFFACD, rot:number=0, spd:number=40, distance:number=Bullet.range) {
		super()
		this.size = size;
		this.color = color;
		this.distance = distance;
		this.curDis = 0
		this.draw();		
		// this.drawBlast();	
		this.loadPartical();
		this.moveData = new MoveData()
		this.moveData.setData(rot, spd)
		this._planeDamage = 1
		this._barrierDamage = 10
		
	}

	public setDirection(rot:number=0, spd=-1){
		if(spd == -1) spd = this.moveData.speed
		this.moveData.setData(rot,spd)
		this.rotation = rot
	}

	public shoot(){	
		const b = this	
		b.activate = true;
		b._sp.visible = true;
		b.curDis = 0
		if(b._blastBmp)b._blastBmp.visible = false;
		if(b._blastPartical)b._blastPartical.visible = false;
	}
	public onFly(e:any = null){		
		const b = this
		const {dx, dy} = b.moveData.getDAxis()
		b.x += dx
		b.y += dy

		b.curDis += b.moveData.speed
		if(b.curDis >= b.distance){
			b.disposeImmediately()
		}
	}

	public dispose(shouldBlast:boolean=true){		
		if(shouldBlast) this.blast();		
		setTimeout(()=>{
			this.activate = false;
			this.parent && this.parent.removeChild(this);	
		}, 200);				
	}

	public disposeImmediately(){
		this.activate = false;
		this.parent && this.parent.removeChild(this);	
	}

	protected draw(){
		const size = this.size
		const size2 = size*1.5
		let sp = new egret.Sprite();		
		sp.graphics.beginFill(this.color);
		// sp.graphics.drawCircle(0,0, this.size);
		sp.graphics.moveTo(size/2, 0)
		sp.graphics.lineTo(size, size2)
		sp.graphics.lineTo(0, size2)
		sp.graphics.endFill();			
		sp.x = -size/2
		sp.y = -size/2
		this.addChild(sp)
		this._sp = sp;	
		this._sp.visible = true;	
	}	

	private drawBlast(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#bulletblast');
		bmp.width = this.size*4;
		bmp.height = this.size*4;
		bmp.x = -this.size*2;
		bmp.y = -this.size*2;
		this.addChild(bmp);		
		this._blastBmp = bmp;		
		this._blastBmp.visible = false;
	}

	private loadPartical(){
		this._blastPartical = new particle.GravityParticleSystem(RES.getRes('blast_png'), RES.getRes('blast_json'));	
		this.addChild(this._blastPartical);	
	}

	protected blast(){		
		this._sp.visible = false;
		if(this._blastBmp)this._blastBmp.visible = true;
		if(this._blastPartical){
			this._blastPartical.visible = true;
			this._blastPartical.start();
		}
	}

	public refreshPosition(){
		super.refreshPosition();
		this._collisionPoints = [new egret.Point(this.x, this.y)];
	}

	public get collisionPoints():egret.Point[]{
		const t = this
		return t._collisionPoints.map((p, i)=>{
			if(!t.parent) return p
			return t.parent.localToGlobal(p.x, p.y)
		});
	}

	public collisionCheck(sp:egret.DisplayObject):boolean{	
		for(let p of this.collisionPoints){
			if(sp.hitTestPoint(p.x, p.y)){
				return true;
			}
		}
		return false;
	}

	public get planeDamage(){
		return this._planeDamage
	}

	public get barrierDamage(){
		return this._barrierDamage
	}

	public static pool:Pool<Bullet> = new Pool<Bullet>(()=>{
		let b = new Bullet()
		Bullet.allArr.push(b);
		return b;
	})	

	public static allArr:Bullet[] = []	
}