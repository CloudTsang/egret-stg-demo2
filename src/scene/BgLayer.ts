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

	/**边界宽度 */
	// private _borderSpanX:number
	// private _borderSpanY:number
	// private _halfStageW:number
	// private _halfStageH:number
	// private _overBorder:boolean


	public constructor(size:number, stagew:number, stageh:number) {
		super()
		this.graphics.lineStyle(50, 0xFF0000, 0.6)
		this.graphics.beginFill(0x00FF00)
		this.graphics.drawRect(0,0,size,size)
		this.graphics.endFill()
		
		let tex:egret.Texture = RES.getRes('bgcell2_png');
		let bmp:egret.Bitmap = new egret.Bitmap(tex);
		bmp.fillMode = egret.BitmapFillMode.REPEAT
        bmp.width = size;
        bmp.height = size;
		bmp.cacheAsBitmap = true

		let layer = new egret.Sprite()
		layer.width = size
		layer.height = size
		// layer.x = size/2
		// layer.y = size/2
		layer.addChild(bmp)
		this._layer = layer
		
		this.anchorOffsetX = size/2
		this.anchorOffsetY = size/2
		
		this.x = stagew/2
		this.y = stageh/2
		this._oriPos = new egret.Point(this.x, this.y)

		// this._halfStageW = this.x
		// this._halfStageH = this.y
		// const tmp = -10
		// this._borderSpanX = this.anchorOffsetX //- this.x + tmp
		// this._borderSpanY = this.anchorOffsetY //- this.y + tmp
		// this._overBorder = false

		// layer.anchorOffsetX = size/2
		// layer.anchorOffsetY = size/2
		super.addChild(layer)

		// const p = new egret.Shape()
		// p.graphics.beginFill(0xFF0000)
		// p.graphics.drawCircle(0,0, 50)
		// p.graphics.endFill()
		// layer.addChild(p)

		// const p2 = new egret.Shape()
		// p2.graphics.beginFill(0x00FF00)
		// p2.graphics.drawCircle(this.anchorOffsetX,this.anchorOffsetX, 25)
		// p2.graphics.endFill()
		// super.addChild(p2)


		const ctex = RES.getRes('clouds_png') as egret.Texture
		const cbmp = new egret.Bitmap(ctex)
		cbmp.fillMode = egret.BitmapFillMode.REPEAT
        cbmp.width = size;
        cbmp.height = size;
		cbmp.alpha = 0.8
		super.addChild(cbmp)
		this._clouds = cbmp
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