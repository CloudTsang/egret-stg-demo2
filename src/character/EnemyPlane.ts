class EnemyPlane extends BasePlane{
	public aiCfg:AIConfig;
	
	protected _playerPosition:egret.Point;
	protected _driftPosition:egret.Point;
	
	protected _shouldShot:boolean;

	protected _movePoint:egret.Point = null;		
	protected _dx:number = 0;
	protected _dy:number = 0;	

	protected _disp:PlaneDisp 

	protected _score:number

	protected _rotationDirection:number
	
	/** 敌方机体 
	 * @param apear 从哪个方向出现
	*/
	public constructor(pw:number = 3, ph:number = 5, apear:0|90|180|270=180) {
		super();
		this.maxHP = 5;
		this.HP = 5;
		this.pWidth = pw;
        this.pHeight = ph;
		this.draw()   
        this.pColor = 0xFF0000;
		this.gears = [4,10,16];
		this.shotSpeed = 750;
		this.shotTimer.delay = this.shotSpeed		
		     
        this.bulletGenerator = EnemyBullet.pool;
		this.bulletRange = EnemyBullet.range
		this._rotationDirection = 0
		this._score = 100
		
		this.rotation = apear		
	}

	public boot(){
        this.moveData.setData(this.rotation, this.speed)
		this.aiCfg = new AIConfig(this); 
    }

	public shot(){
		if(this.shotTimer.running){
			return;
		}
		this.shotTimer.repeatCount = 0;
		this.shotTimer.addEventListener(egret.TimerEvent.TIMER, this.onShot, this)
		this.shotTimer.start();
	}

	public stop(){
		if(!this.shotTimer.running){
			return;
		}
		this.shotTimer.removeEventListener(egret.TimerEvent.TIMER, this.onShot, this)
		this.shotTimer.stop();
	}


	private onShot(){
		const t = this
		if(!t.parent){
			return
		}
		const parent = t.parent as BgLayer
		for(let i=0; i<t.bulletDirections.length; i++){
            let b = t.bulletGenerator.getOne()
            b.x = t.x;
            b.y = t.y;
            
            let d = t.bulletDirections[i];
            b.setDirection(t.rotation+d)
            parent.addGameObj(b);
            b.shoot()                        
        }        
	}

	protected draw(){
		const t = this
        let disp = new PlaneDisp(1)
        disp.width = t.pWidth*4;
		disp.height = t.pHeight*4;
		disp.x = -t.pWidth*2;
		disp.y = -t.pHeight*2;
        t.addChild(disp);	
        t._disp = disp
	}

	public refreshMove(){	
		const p = this
		// if(p._adjust)return
        p.rotation += p._rotationDirection * p.rotStep
		
        p.curGear = 0+1
        p.moveData.setData(p.rotation, p.speed)
        const {dx, dy} = p.moveData.getDAxis()
        this.x += dx
        this.y += dy
		this.checkIfOverBorder()
	}

	public refreshAI(player:BasePlane, drifts:Drift[]){
		const t = this
		const v = t.aiCfg.refreshAI(player, drifts)
		if(!v) {
			return //没有变化
		}
		let des = ''
		if(v.shot == AI_Shot.FIRE){
			des += '开始射击,'
			t.shot()
		}else{
			des += "停止射击,"
			t.stop()
		}

		switch(v.speed){
			case AI_Speed.NORMAL:
			des += "平速,"
			t.curGear = 1
			break
			case AI_Speed.FAST:
			des += "加速,"
			t.curGear = 2
			break
			case AI_Speed.SLOW:
			des += "减速,"
			t.curGear = 0
			break
		}

		switch(v.rotation){
			case AI_Rotation.MINUS:
			des += "逆时针,"
			t._rotationDirection = -1
			break
			case AI_Rotation.STRAIGHT:
			des += "直线,"
			t._rotationDirection = 0
			break
			case AI_Rotation.PLUS:
			des += "顺时针,"
			t._rotationDirection = 1
			break
		}
		
	}

	public crash(){        
		this.stop();		
		super.crash();
    }  

	/**获取目标点的方位 */
	protected getDirectionFromMovePoint(){
		if(!this._movePoint){
			return;
		}
		if(this._movePoint.x > this.x + this.speed){
			this._dx = 1;
		}else if(this._movePoint.x < this.x - this.speed){
			this._dx = -1
		}else{
			this._dx = 0
		}
		if(this._movePoint.y > this.y + this.speed){
			this._dy = 1;
		}else if(this._movePoint.y < this.y - this.speed){
			this._dy = -1
		}else{
			this._dy = 0
		}
		
	}

	protected checkShouldShot(){
		if(!this._playerPosition){
			return;
		}
		if(this._playerPosition.x > this.x - this.width * 2 && this._playerPosition.x < this.x + this.width * 2){
			this._shouldShot = true;
		}else{
			this._shouldShot = false;
		}
	}

	/**获取最少子弹的移动方向 */
	protected getLessBulletDirection(){
		
		let tmpdx = this.x > this._stage.stageWidth - this.x?-1:1;
		let tmpdy = this.y > this._stage.stageHeight - this.y?-1:1;		
		return [tmpdx, tmpdy]
	}

	public get score(){
		return this._score
	}
	

	// public static pool:Pool<EnemyPlane> = new Pool<EnemyPlane>(()=>{return new EnemyPlane()})	
}

