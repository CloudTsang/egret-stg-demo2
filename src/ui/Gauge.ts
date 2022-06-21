class BarrierGauge extends eui.ProgressBar{
	private _plane:BasePlane
	public constructor() {
		super()
	}

	public set plane(v:BasePlane){
		this._plane = v
		this.refresh()
	}
	public refresh(){
		this.value = this._plane?this._plane.barrier.energy:0
	}
}

class HPGauge extends eui.ProgressBar{
	private _plane:BasePlane
	public constructor() {
		super()
		this.skinName = 'resource/eui_skins/HpBarSkin.exml'
	}

	public set plane(v:BasePlane){
		this._plane = v
		this.refresh()
	}
	public refresh(){
		const p = this._plane
		if(!p) return
		const tmp = p.HP / p.maxHP * 100
		this.value = tmp
	}
	
}