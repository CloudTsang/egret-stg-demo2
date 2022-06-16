class Barrier {
	public static readonly MAX_ENERGY = 100
	private readonly fps:number = egret.MainContext.instance.stage.frameRate
	/**护盾能量：秒 */
	private _energy:number
	private _reduceCount:number
	private _p:BasePlane
	private _filter:egret.GlowFilter
	private _on:boolean
	private _lock:boolean
	public constructor(p:BasePlane, baseE:number = 0) {
		this.energy = baseE
		this._p = p
		this._filter = new egret.GlowFilter(0xFFD700, 1, 100, 100, 10)
		this._on = false
	}

	public boot(){
		if(this._energy == 0)return
		const p = this._p
		this._on = true
		if(!p.filters)p.filters = [this._filter]
		else p.filters = p.filters.concat(this._filter)
	}

	public shut(){
		const p = this._p
		const fils = p.filters
		const buff = this._filter
		for(let i=0;i<fils.length; i++){
			const f = fils[i]
			if(f == buff){
				fils.splice(i)
				break
			}
		}
		this._on = false
		p.filters = fils
	}

	public set energy(sec:number){
		const t = this
		sec = sec<0?0:sec
		t._energy = sec
		t._reduceCount = 0
		if(sec == 0 && t._on){
			t.shut()
		}
	}

	public get energy(){
		return this._energy
	}

	/**被击中导致的能量减少 */
	public reduceEnergyByHit(d:number = 5){
		const t = this
		if(t._energy == 0 || t._lock || !t._on) return
		t.energy -= d
	}

	/**经过时间导致的能量减少 */
	public reduceEnergyByTime(){
		const t = this
		if(t._energy == 0 || t._lock || !t._on) return
		t._reduceCount ++
		if(t._reduceCount == t.fps){
			t.energy --
		}
	}

	public get isOn(){
		return this._on
	}

	public lock(){
		this._lock = true
	}
	
	public unlock(){
		this._lock = false
	}
}