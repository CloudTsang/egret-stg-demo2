class EnemyPlane extends BasePlane{
	public aiCfg:AIConfig;

	protected _disp:PlaneDisp 

	protected _score:number

	protected _rotationDirection:number
	protected _type:number = 1

	protected lockAI:boolean = false
	
	/** 敌方机体 
	 * @param apear 从哪个方向出现
	*/
	public constructor(pw:number = 3, ph:number = 5, apear:0|90|180|270=180, ty:number=1) {
		super();
		this.maxHP = 5;
		this.HP = 5;
		this.pWidth = pw;
        this.pHeight = ph;
		this._type = ty
		this.draw()   
        this.pColor = 0xFF0000;
		this.gears = WorldData.SPEED.EnemyPlane;
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

	/**同时生成复数个敌机时，设置delay错开ai计算的时间 */
	public aiDelay(n:number){
		this.aiCfg.delay(n)
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
        let disp = new PlaneDisp(t._type)
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
		this._disp.setSpinState(p._rotationDirection)
		this.checkIfOverBorder()
	}

	public refreshAI(player:BasePlane, drifts:Drift[]){
		const t = this
		if(t.lockAI) return
		const v = t.aiCfg.refreshAI(player, drifts)
		if(!v) {
			return //没有变化
		}
		let des = ''
		if(v.shot == AI_Shot.FIRE){
			// des += '开始射击,'
			t.shot()
		}else{
			// des += "停止射击,"
			t.stop()
		}

		switch(v.speed){
			case AI_Speed.NORMAL:
			// des += "平速,"
			t.curGear = 1
			break
			case AI_Speed.FAST:
			// des += "加速,"
			t.curGear = 2
			break
			case AI_Speed.SLOW:
			// des += "减速,"
			t.curGear = 0
			break
		}

		switch(v.rotation){
			case AI_Rotation.MINUS:
			// des += "逆时针,"
			t._rotationDirection = -1
			break
			case AI_Rotation.STRAIGHT:
			// des += "直线,"
			t._rotationDirection = 0
			break
			case AI_Rotation.PLUS:
			// des += "顺时针,"
			t._rotationDirection = 1
			break
		}
		
	}

	public confuseAI(v:boolean){
		const t = this
		if(v){
			t.stop()
			t.curGear = 0
			t._rotationDirection = 1
		}
		t.lockAI = v
	}

	public crash(){        
		this.stop();		
		super.crash();
    }  

	public get score(){
		return this._score
	}
	

	// public static pool:Pool<EnemyPlane> = new Pool<EnemyPlane>(()=>{return new EnemyPlane()})	
}

