/**
 * layer :
 * 1|2
 * 3|4
 * +x : 朝24象限移动，-x：朝13象限移动
 * +y：朝34象限移动， -y：朝12象限移动
 */

class BgLayer extends egret.Sprite{
	private _layer:egret.Sprite
	private _clouds:egret.Bitmap

	private _oriPos:egret.Point
	private _stage = egret.MainContext.instance.stage;

	public constructor(size:number, stagew:number, stageh:number) {
		super()
		// this.graphics.lineStyle(50, 0xFF0000, 0.6)
		// this.graphics.beginFill(0x00FF00)
		// this.graphics.drawRect(0,0,size,size)
		// this.graphics.endFill()
		
		let tex:egret.Texture = RES.getRes('bgcell2_png');
		
		let bmp:egret.Bitmap = new egret.Bitmap(tex);
		bmp.fillMode = egret.BitmapFillMode.REPEAT
        bmp.width = size;
        bmp.height = size;

		let layer = new egret.Sprite()
		layer.width = size
		layer.height = size
		this._layer = layer

		layer.addChild(bmp)
		
		this.anchorOffsetX = size/2
		this.anchorOffsetY = size/2
		
		this.x = stagew/2
		this.y = stageh/2
		this._oriPos = new egret.Point(this.x, this.y)

		super.addChild(layer)

		const ctex = RES.getRes('clouds_png') as egret.Texture
		const cbmp = new egret.Bitmap(ctex)
		cbmp.fillMode = egret.BitmapFillMode.REPEAT
        cbmp.width = size;
        cbmp.height = size;
		cbmp.alpha = 0.7
		super.addChild(cbmp)
		this._clouds = cbmp
	}

	private createBmp(){

	}

	public resetPosition(){
		this.x = this._oriPos.x
		this.y = this._oriPos.y
	}

	public setPosition(x:number, y:number){
		const t = this
		t.x = x
		t.y = y
		
	}

	// public overBorderCanceled(){
	// 	this._overBorder = false
	// }

	private set layerRotation(v:number){
		this._layer.rotation = v
	}

	private get layerRotation(){
		return this._layer.rotation
	}

	public addGameObj(child:egret.DisplayObject){
		// super.addChildAt(child, this._clouds?this.numChildren-1:this.numChildren)
		super.addChildAt(child, this.numChildren-1)
	}

	public addChild(child: egret.DisplayObject): egret.DisplayObject{
        return this._layer.addChild(child)
    }

	public dispose(){
		this.removeChildren()
		this.parent && this.parent.removeChild(this)
	}
	
}

interface PositionData{
	x:number
	y:number
	anchorX:number
	anchorY:number
}