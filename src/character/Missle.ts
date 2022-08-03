class Missle extends CollisionObject implements IWeapon{
	/**转弯点距离 */
	private _midDistance:number = 200
	protected spd:number = 1000
	 /**碰撞检测点 */
    protected _collisionPoints:egret.Point[]   
	private _bmp:egret.Bitmap
	private _particle:particle.GravityParticleSystem
	private _tgt:BaseCharacter
	private _plane:BasePlane
	private _tw:egret.Tween

	private _oriP:egret.Point
	private _midP:egret.Point
	private _disposed:boolean

	public planeDamage:number = 5
	public subDamage:number = 3
	public barrierDamage:number = 10
	public dmgDistance:number = 200

	/**
	 * @param pd 目标伤害
	 * @param sd 波及伤害
	 * @param dd 波及范围
	 * @param bd 护盾伤害
	 */
	public constructor(p:BasePlane, tgt:BaseCharacter,
		pd:number=5,sd:number=3,dd:number=200,bd:number=10,
		w:number=20, h:number=60
	) {
		super()
		this.width = w
		this.height = h
		this._plane = p
		this._tgt = tgt
		this.planeDamage = pd
		this.subDamage = sd
		this.dmgDistance = dd
		this.barrierDamage = bd
		this.draw()

	}

	protected draw(){
		const t = this

		const ptc = new particle.GravityParticleSystem(RES.getRes('blast_png'), RES.getRes('missle_json'));	
		ptc.y = t.height
		ptc.x = t.width/2
		t.addChild(ptc);	
		t._particle = ptc
		
		const bmp = new egret.Bitmap(RES.getRes("sheet_json#missle") as egret.Texture)
		bmp.width = t.width
		bmp.height = t.height
		t.addChild(bmp)
		t._bmp = bmp
		
	}

	public blast(){
		const t = this
		const ptc:particle.GravityParticleSystem = new particle.GravityParticleSystem(RES.getRes('blast2_png'), RES.getRes('blast2_json'));			
		return ptc
	}

	public lauch(){
		const t = this
		t._disposed = false
		t.rotation = t._plane.rotation
		t._particle.start()
		t._oriP = new egret.Point(t._plane.x, t._plane.y)
		t._midP = t.point2Calc()
		t._tw = egret.Tween.get(t)
		.to({
			factor: 1
		}, t.spd)
		.call(()=>{
			t._disposed = true
			t._tw = null
			// t.blast()
			const evt = new egret.Event(PlayEvents.MISSLE_HIT)
			evt.data = {
				missle:t
			}
			t.dispatchEvent(evt)
		})
		
	}

	public pause(){
		this._tw && this._tw.pause()
	}

	public resume(){
		this._tw && this._tw.play()
	}

	public get tgt(){
		return this._tgt
	}

	protected get tgtP():egret.Point{
		const tgt = this._tgt
		return new egret.Point(tgt.x, tgt.y)
	}

	protected point2Calc(){
		const t = this
		const p = t._plane
		
		const rot = p.radRotation
		const dx = Math.sin(rot) * t._midDistance
		const dy = - Math.cos(rot) * t._midDistance
		const nx = p.x + dx
		const ny = p.y + dy
		// console.log(p.rotation, dx, dy)
		return new egret.Point(nx, ny)
	}

	public get factor():number{
		return 0
	}

	public set factor(v:number){
		const t = this
		if(t._disposed) return
		const tp = t.tgtP
		const nx = (1 - v) * (1 - v) * t._oriP.x + 2 * v * (1 - v) * t._midP.x + v * v * tp.x;
        const ny = (1 - v) * (1 - v) * t._oriP.y + 2 * v * (1 - v) * t._midP.y + v * v * tp.y;

		

		// const tan = Math.abs((nx-t.x)/(ny-t.y))
		// const tmp = 1
		const k = (nx-t.x)/(ny-t.y)
		const tmp1 = nx<t.x
		const tmp2 = ny<t.y
		// const tan = (ny-t.y)/(nx-t.x)
		const atan = Math.atan(k)*180/Math.PI
		const tmp3 = atan>0
		let deg = Math.floor(Math.abs(atan)*(tmp1?-1:1))
		let deg2 = deg

		// let tmp4 = 0
		
		if( (tmp1 && tmp2)  == tmp3){
			if(tmp1 && !tmp2){
				deg2 = 180-deg
			}else{
				deg2 = deg
			}		
		}else{
			deg2 = 180 - deg
		}
		t.rotation = deg2

		t.x = nx
		t.y = ny
		
	}

	public dispose(){
		const t = this
		t.removeChildren()
		t._tgt = null
		t._particle = null
		t._bmp = null
		t.parent && t.parent.removeChild(t)
	}
}