class DashGauge extends egret.Sprite{	
	private _arr:egret.DisplayObject[];
	public constructor() {
		super();		
		this._arr = [];
	}

	public setDashTime(v:number){
		if(v> this._arr.length){
			for(let i=this._arr.length; i<v; i++){
				let icon = this.drawIcon()	
				icon.x = -icon.width * (i+1);
				this.addChild(icon)		
				this._arr.push(icon)	
			}
		}
		for(let i=0;i<this._arr.length; i++){
			this._arr[i].visible = i<v;
		}
	}

	private drawIcon(){
		const scale = 0.5
		let icon = new egret.Bitmap()		
		let tex = RES.getRes("sheet_json#jet")
		icon.texture = tex		
		icon.width *= 0.5
		icon.height *= 0.5
		return icon
	}
}