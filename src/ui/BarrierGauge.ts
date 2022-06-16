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