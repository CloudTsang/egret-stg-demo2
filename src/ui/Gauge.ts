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

class MissleGauge extends CoolingQueueMcForCircle{//eui.ProgressBar{
	private _plane:BasePlane
	private _btn:eui.Button
	public constructor(target: egret.DisplayObject, btn:eui.Button, w:number) {
		super(target, w)
		this._btn = btn
	}

	public set plane(v:BasePlane){
		this._plane = v
		this.refresh()
	}
	public refresh(){
		const t = this
		const v = t._plane?t._plane.missleLaucher.curLockTimeProgress:0
		t.setProgress(v, 100)
		if(t._plane.missleLaucher.missleLauchable){
			t._btn.enabled = true
		}else{
			t._btn.enabled = false
		}
	}
}

class BarrierGauge extends CoolingQueueMcForCircle{//eui.ProgressBar{
	private _plane:BasePlane
	public constructor(target: egret.DisplayObject, w:number) {
		super(target, w)
	}

	public set plane(v:BasePlane){
		this._plane = v
		this.refresh()
	}
	public refresh(){
		const v = this._plane?this._plane.barrier.energy:0
		this.setProgress(v, 100)
	}
}

class BarrierGaugePC extends eui.ProgressBar{
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


class MissleGaugePC extends eui.ProgressBar{
	private _plane:BasePlane
	public constructor() {
		super()
	}

	public set plane(v:BasePlane){
		this._plane = v
		this.refresh()
	}
	public refresh(){
		this.value = this._plane?this._plane.missleLaucher.curLockTimeProgress:0
	}
}