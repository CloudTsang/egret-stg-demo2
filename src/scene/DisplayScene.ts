class DisplayScene extends egret.Sprite{
	public constructor(stage:egret.Stage) {
		super();
		this.x = 0;
        this.y = 0;    
        this.width = stage.stageWidth;
        this.height = stage.stageHeight;
        this.graphics.beginFill(0x87CEEB)
        this.graphics.drawRect(0,0,this.width, this.height);
        this.graphics.endFill()	

		this.display()	
	}

	private display(){
		let player = new PlayerPlane()
        player.x = player.width/2;
        player.y = player.height/2;                     
        // this.addChild(player);

		// let sub = new SubPlane()
		// sub.x = sub.width/2;
		// sub.y = sub.height/2;
		// this.addChild(sub)

		let enemy = new EnemyPlane();
		enemy.x = enemy.width/2;
		enemy.y = enemy.height/2;
		this.addChild(enemy)

		
	}
}