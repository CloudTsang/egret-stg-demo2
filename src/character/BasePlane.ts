class BasePlane extends BaseCharacter{
	protected pWidth = WorldData.PLANE_WIDTH;
    protected pHeight = WorldData.PLANE_HEIGHT;
	protected pColor = 0xFFFFFF;
        
    public rotStep = 2;
    /**射击间隔 */
    protected shotSpeed = 200;
    /**射击间隔timer */
    protected shotTimer:egret.Timer;
    /**护盾电力 */
    public barrier:Barrier
    
    /**子弹生成池*/    
    protected _bulletGenerator:Pool<Bullet>;
    /**子弹方向数组 */
    public bulletDirections:number[] = [0];     
    /**子弹射程*/
    public bulletRange:number   

    protected buffManager:BuffManager;         

    /**碰撞检测点 */
    protected _collisionPoints:egret.Point[]   
    protected moveData:MoveData  
    /**速度档次：慢中快*/  
    public gears:number[] = [8, 10, 15]
    protected curGear:number = 1

    protected MAP_SIZE:number = WorldData.MAP_SIZE
    /**间隔多少次移动指令检测一次越界 */
    protected checkOverBorderCount:number = 0
    protected readonly maxCheckOverBorderCount:number = 10

	public constructor() {
		super();        
        this.buffManager = new BuffManager(this);      
        this.shotTimer = new egret.Timer(this.shotSpeed, 1);
        this.moveData = new MoveData()
        this.barrier = new Barrier(this)
	}

    public boot(){
        this.moveData.setData(0, this.speed)
    }

    public onPause(){
        this.shotTimer.stop();
        this.buffManager.onPause();
    }

    public onResume(){
        this.shotTimer.start();
        this.buffManager.onResume();
    }

	protected draw(){
        this.graphics.beginFill(this.pColor)
        this.graphics.moveTo(-this.pWidth, this.pHeight);
        this.graphics.lineTo(this.pWidth, this.pHeight);
        this.graphics.lineTo(0, -this.pHeight);
        this.graphics.endFill()       
    }    

    public move(boot:-1|0|1,spin:-1|0|1){
        const p = this
        p.rotation += spin * p.rotStep
        p.curGear = boot+1
        p.moveData.setData(p.rotation, p.speed)
        const {dx, dy} = p.moveData.getDAxis()
        p.x += dx
        p.y += dy

        p.checkIfOverBorder()
    }

    public spin(d:number){
        const p = this
        p.rotation += d* p.rotStep
        p.moveData.setData(p.rotation, p.speed)
    }


    public shot(){      
        const p = this  
        if(p.shotTimer.running){
            return;
        }       
        for(let i=0; i<p.bulletDirections.length; i++){
            let b = p.bulletGenerator.getOne()
            b.x = p.x
            b.y = p.y            
            let d = p.bulletDirections[i];
            b.setDirection(p.rotation+d)
            p.parent.addChild(b);
            b.shoot()                        
        }        
        p.shotTimer.start()        
    }

    public set bulletGenerator(pl:Pool<Bullet>){
        this._bulletGenerator = pl
    }

    public get bulletGenerator(){
        return this._bulletGenerator
    }

    public setBuff(ty:BuffType, duration:number){
        this.buffManager.getBuff(ty, duration);
    }

    public loseBuff(ty:BuffType){
        
    }
    

    /**被击坠 */
    public crash(){
        this.buffManager.dispose()
        this.parent && this.parent.removeChild(this)
    }    

    public refreshPosition(){
		super.refreshPosition();
		this._collisionPoints = [new egret.Point(this.x-this.pWidth, this.y),
                                new egret.Point(this.x+this.pWidth, this.y),
                                new egret.Point(this.x, this.y-this.pHeight),
                                new egret.Point(this.x, this.y+this.pHeight),
                                ]
        this.barrier.reduceEnergyByTime()
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

    public get speed(){
        return this.gears[this.curGear]
    }

    public hit(b:Bullet){		
        if(this.barrier.isOn){  
            this.barrier.reduceEnergyByHit(b.barrierDamage)
        //    console.log("b.barrierDamage  : ", b.barrierDamage, this.barrier.energy);
            return false
        }
		this.HP -= b.planeDamage	
        return true	
	}

    protected checkIfOverBorder(){ 
        const t = this
        if(t.checkOverBorderCount < t.maxCheckOverBorderCount){
            t.checkOverBorderCount ++
            return
        }else{
            t.checkOverBorderCount = 0
           
        }
        let tmp_s:string = ''
        if(t.x <= 0){
            tmp_s = 'left'
        }
        else if(t.x >= t.MAP_SIZE){
            tmp_s = 'right'
        }
        else if(t.y <= 0){
            tmp_s = 'top'
        }
        else if(t.y >= t.MAP_SIZE){
            tmp_s = 'bottom'
        }
        if(tmp_s.length == 0){
            return
        }
        const evt = new egret.Event(PlayEvents.OVER_BORDER)
        evt.data = {
            d:tmp_s
        }
        t.dispatchEvent(evt)
    }

    public bootBarrier(v:boolean){
        if(v){
            this.barrier.boot()
        }else{
            this.barrier.shut()
        }
        
    }

    /**是否开启了护盾 */
    public get isBarrier(){
        return this.barrier.isOn
    }
   
}