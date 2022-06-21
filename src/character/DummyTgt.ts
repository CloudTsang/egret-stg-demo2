class DummyTgt extends BaseCharacter {
	public score = 1
	public constructor() {
		super()
		this.maxHP = 3;
		this.HP = 3;
		this.draw()
	}

	private draw(){
		const size = 80
		let bmp = new egret.Bitmap();		
		bmp.texture = RES.getRes('sheet_json#tgt');
		bmp.width = size;
		bmp.height = size;
		bmp.x = -size/2;
		bmp.y = -size/2;		
		this.addChild(bmp);		
	}

	public refreshPosition(){
		this.position = new egret.Point(this.x, this.y);
	}

	public dispose(){
		this.parent && this.parent.removeChild(this)
	}

	public crash(){
		this.dispose()
	}
}