class MissleLaucher extends egret.EventDispatcher{
	/**开始锁定距离 */
	public lockDistance:number

	/**锁定时长 */
	protected _lockTime:number
	/**解除锁定时长*/ 
	protected _missTime:number
	/**已锁定时长 */
	protected _curTime:number
	/** 丢失目标时长*/
	protected curMiss:number

	private _plane:BasePlane
	private _tgt:BaseCharacter
	private _lockMark:egret.Bitmap
	private _boost:boolean
	private _lockShape:MissleLockShape
	private _stageH:number
	private _stageW:number
	private _addTime:number
	
	public constructor(p:BasePlane) {
		super()
		const sh = egret.MainContext.instance.stage.stageHeight
		const sw = egret.MainContext.instance.stage.stageWidth
		this._plane = p
		this.lockTime = 1
		this._missTime = 0
		this._curTime = 0
		this._boost = false
		this._lockShape = new MissleLockShape(sh, sw)
		this.lockDistance = egret.Point.distance(
			new egret.Point(0,0), new egret.Point(sw/2, sh/2)
		)
		
		const lm = new egret.Bitmap(RES.getRes("sheet_json#lockon"))
		this._lockMark = lm

	}

	public genMissle():Missle{
		const t = this
		let m:Missle 
		if(!t._boost){
			m = new Missle(t._plane, t._tgt, 10, 3 , 200 ,10)
		}else{
			m = new Missle(t._plane, t._tgt, 20, 5, 250, 10)
		}
		m.once(PlayEvents.MISSLE_HIT, t.onMissleBlast, t)
		return m
	}

	protected onMissleBlast(e:egret.Event){
		this.dispatchEvent(e)
	}

	public refresh(enemys:BaseCharacter[], add:number=2){
		const locked = this.calc(enemys)
		if(!locked || locked != this._tgt){
			this.reset()	
		}
		this._addTime = add
		this.target = locked
	}

	public calc(enemys:BaseCharacter[]){
		let distance:number = 999999
		let tgt:BaseCharacter = null
		const t = this
		const p = t._plane
		const ld = t.lockDistance
		const ls = t._lockShape

		if(t._tgt){
			const tmp0 = t.calcSingleTgt(t._tgt)
			if(tmp0 != -1){
				//当前目标仍在锁定范围内
				return t._tgt
			}
		}

		//从新查找目标
		for(let en of enemys){
			let tmp1 = t.calcSingleTgt(en)
			if(tmp1 == -1) continue
			if(tmp1 < distance){
				distance = tmp1
				tgt = en
			}
		}
		return tgt
	}

	protected calcSingleTgt(en:CollisionObject):number{
		const p = this._plane
		const ld = this.lockDistance
		const ls = this._lockShape
		let tmp1 = AIConfig.distanceData[en.hashCode]
		if(!tmp1){
			tmp1 = egret.Point.distance(en.position, p.position)
		} 
		if(tmp1 > ld) return -1
		if(!en.parent) return -1
		const np = en.parent.localToGlobal(en.position.x, en.position.y)
		const inShape = ls.hitTestPoint(np.x, np.y, true)
		if(!inShape) return -1
		return tmp1
	}

	public set target(tgt:BaseCharacter){
		const t = this
		if(tgt && t.curTime < t._lockTime){
			t.curTime += this._addTime
			t._tgt = tgt
		}else if(!tgt){
			// t._missTime ++
		}

		if(t._tgt && t._lockMark){
			if(t._lockMark.parent && t._lockMark.parent != t._tgt){
				t._lockMark.parent.removeChild(t._lockMark)
			}else if(t._lockMark.parent && t._lockMark.parent == t._tgt){
				return
			}
				
			
			const size = Math.max(t._tgt.width, t._tgt.height)/1.5
			t._lockMark.width = size
			t._lockMark.height = size
			t._lockMark.anchorOffsetX = size/2
			t._lockMark.anchorOffsetY = size/2
			t._tgt.addChild(t._lockMark)
			
		}else if(!t._tgt && t._lockMark.parent){
			t._lockMark.parent.removeChild(t._lockMark)
		}
	}

	public get target(){
		return this._tgt
	}
	
	public reset(){
		this._curTime = 0
		this._tgt = null
	}

	protected set curTime(v:number){
		if(v > this._lockTime) v = this._lockTime
		this._curTime = v
	}

	protected get curTime(){
		return this._curTime
	}

	public set lockTime(sec:number){
		this._lockTime = sec * egret.MainContext.instance.stage.frameRate
	}

	public get isKeepLocking():boolean{
		return true
	}

	public get curLockTimeProgress():number{
		return this.curTime / this._lockTime * 100
	}

	public get missleLauchable():boolean{
		return this.curTime == this._lockTime
	}

	public get lockShape():MissleLockShape{
		return this._lockShape
	}

	public set boost(v:boolean){
		this._boost = v
		this._lockShape.refresh(v)
		if(v){
			this.lockTime = 0.5
		}else{
			this.lockTime = 1
		}
	}
}


class MissleLockShape extends egret.Shape{
	private _stageH:number
	private _stageW:number
	private _points:egret.Point[]
	public constructor(sH:number, sW:number){

		super()
		this._stageH = sH
		this._stageW = sW
		this._points = this.pointsTriangle
		this.draw()
	}

	public refresh(boost:boolean){
		if(boost){
			this._points = this.pointsRect
		}else{
			this._points = this.pointsTriangle
		}
		this.draw()
	}

	private draw(){
		const t = this
		t.graphics.clear()
		t.graphics.beginFill(0x00FF00, )
		for(let i=0; i<t._points.length; i++){
			let p = t._points[i]
			if(i == 0){
				t.graphics.moveTo(p.x, p.y)
			}else{
				t.graphics.lineTo(p.x, p.y)
			}
		}
		t.graphics.endFill()
		t.alpha = 0
	}

	private get pointsTriangle():egret.Point[]{
		const w = this._stageW
		const h = this._stageH
		return [
			new egret.Point(w/2, h/2),
			new egret.Point(0,0),
			new egret.Point(w,0),
			new egret.Point(w/2, h/2)
		]
	}

	private get pointsRect():egret.Point[]{
		const w = this._stageW
		const h = this._stageH
		return [
			new egret.Point(w/2, h/2),
			new egret.Point(0, h/2),
			new egret.Point(0,0),
			new egret.Point(w,0),
			new egret.Point(w, h/2),
			new egret.Point(w/2, h/2)
		]
	}
}