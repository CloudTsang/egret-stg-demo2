class Radar extends egret.Sprite{
	private _r:number
	private _player:CollisionObject
	private _objs:CollisionObject[]
	private _radarObjs:egret.Shape[]
	private _layer:egret.Sprite
	private RADAR_OBJ_R:number = 10
	
	public constructor(x:number, y:number, r:number=75) {
		super()
		const d = r * 2
		this.x = x - d
		this.y = y
		this.width = d
		this.height = d 
		this._r = r
		this._objs = []
		this._radarObjs = []
		this.draw()
	}

	public dispose(){
		this._radarObjs = null
		this._objs = null
		this.parent && this.parent.removeChild(this)
	}

	private draw(){
		const bmp = new egret.Bitmap(RES.getRes("sheet_json#radar"))
		bmp.width = this.width
		bmp.height = this.height
		this.addChild(bmp)

		const layer = new egret.Sprite()
		layer.width = this.width
		layer.height = this.height
		layer.x = layer.width/2
		layer.y = layer.height/2
		layer.anchorOffsetX = layer.x
		layer.anchorOffsetY = layer.y

		layer.graphics.beginFill(0x000000, 0)
		layer.graphics.drawRect(0,0,layer.width,layer.height)
		layer.graphics.endFill()

		this._layer = layer
		this.addChild(layer)

	}

	public regPlayer(player:CollisionObject){
		this._player = player
	}

	public regObject(obj:CollisionObject){	
		const t = this
		if(!t._objs) return
		let shp:egret.Shape
		if(obj instanceof BasePlane){
			shp = t.drawEnemey()
		}
		else if(obj instanceof DummyTgt){
			shp = t.drawEnemey() 
		}
		else if(obj instanceof Drift){
			shp = t.drawDrift()
		}
		t._objs.push(obj)
		t._radarObjs.push(shp)
		t.calc(t._player, obj, shp)
		t._layer.addChild(shp)
	}

	public removeObject(obj:CollisionObject){
		this._objs.every((e, i)=>{
			if(e == obj){
				this._objs.splice(i, 1)
				const ro = this._radarObjs.splice(i, 1)[0]
				ro.parent && ro.parent.removeChild(ro)
				return false
			}
			return true
		})
	}

	public refresh(){	
		const t = this
		const objs = t._objs
		t._objs.forEach((obj, index)=>{
			t.calc(t._player, obj, t._radarObjs[index])
		})
		t._layer.rotation = -t._player.rotation
	}

	private calc(player:CollisionObject, obj:CollisionObject, shp:egret.Shape){
		if(!player || !obj) return -1
		const radarR = this._r
		const radarObjR = this.RADAR_OBJ_R/2
		const p1 = player.position
		const p2 = obj.position
		const d = egret.Point.distance(p1, p2)
		const sin = (p2.x-p1.x)/d
		const cos = (p2.y-p1.y)/d
		const nx = sin*radarR
		const ny = cos*radarR
		shp.x = Math.floor(radarR + nx + radarObjR)
		shp.y = Math.floor(radarR + ny + radarObjR)
		return 1
	}

	private drawEnemey(){
		const r = this.RADAR_OBJ_R
		let shp = new egret.Shape()
		shp.graphics.beginFill(0XFF4500)
		shp.graphics.drawCircle(-r,-r, r)
		shp.graphics.endFill()
		shp.cacheAsBitmap = true
		return shp
	}

	private drawDrift(){
		const r = this.RADAR_OBJ_R
		let shp = new egret.Shape()
		shp.graphics.beginFill(0xFFD700)
		shp.graphics.drawCircle(-r,-r,r)
		shp.graphics.endFill()
		shp.cacheAsBitmap = true
		return shp
	}
}