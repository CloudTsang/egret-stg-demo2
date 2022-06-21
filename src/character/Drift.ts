/**漂流道具 
 * 在屏幕Y轴一定范围内上下往复移动，被击中maxHP后变成buff
*/
class Drift extends BaseCharacter{		
	public buff:{type:BuffType, defaultDuration:number, label:string} = null;

	protected _collisionPoints:egret.Point[]
	private _time:number
	/**
	 * @param sec 维持秒数
	 */
	public constructor(sec:number=30) {
		super();
		this.maxHP = 3;
		this.HP = 3;
		this._time = sec //* egret.MainContext.instance.stage.frameRate
		this.draw();			
	}

	public timePassed(){
		this._time -- 
		return this._time != 0
	}

	private draw(){
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#drift');
		bmp.width = 80;
		bmp.height = 80;
		bmp.x = 0;
		bmp.y = 0;		
		this.addChild(bmp);		
	}

	public change2Buff(ty:BuffType=null){
		if(!ty){
			let arr = [
						BuffType.BULLET_BOOST_BIG,
						BuffType.BULLECT_BOOST_PLUS2DIRECT,
						BuffType.BARRIER,
						BuffType.HIGH_SPEED,
						BuffType.HP_RECOVER,
						
						//BuffType.INVINSIBLE,
						//BuffType.SUB_PLANE
						]
			ty = arr[Math.floor(Math.random()*arr.length)]
		}		
		let data = BuffManager.getBuffData(ty);
		this.buff = data;
		this.drawBuff();
	}

	private drawBuff(){
		if(!this.buff){
			return;
		}
		let bmp = new egret.Bitmap();
		bmp.texture = RES.getRes('sheet_json#buff');
		bmp.width = 100;
		bmp.height = 100;
		bmp.x = 0;
		bmp.y = 0;

		let label = new egret.TextField();
		label.bold = true;
		label.size = 80;
		label.textColor = 0x000000;
		label.width = 100;
		label.height = 100;
		label.verticalAlign = egret.VerticalAlign.MIDDLE;
		label.textAlign = egret.HorizontalAlign.CENTER;
		
		label.text = this.buff.label;

		this.removeChildren();		
		this.addChild(bmp);
		this.addChild(label);
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	public refreshPosition(){
		this.position = new egret.Point(this.x, this.y);
		this._collisionPoints = [
			new egret.Point(this.x, this.y),
			new egret.Point(this.x+this.width, this.y),
			new egret.Point(this.x+this.width, this.y+this.height),
			new egret.Point(this.x, this.y+this.height)
			]
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
}