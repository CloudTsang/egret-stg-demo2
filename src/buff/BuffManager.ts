class BuffManager {
	public bigBulletBuff:BigBulletBuff;
	public dashInvinsibleBuff:DashInvinsibleBuff;
	public direction3BulletBuff:Direction3BulletBuff;
	public direction5BulletBuff:Direction5BulletBuff;
    public directionPlus2BullectBuff:DirectionPlus2BullectBuff;
	public barrierBuff:BarrierBuff;
	public subPlaneBuff:SubPlaneBuff;
	private _plane:BasePlane;
    private _buffNum:number;
	public constructor(p:BasePlane) {
		this._plane = p;    
        this._buffNum = 0    
	}   

    public static getBuffData(ty:BuffType) {
        switch(ty){
            case BuffType.BARRIER:
               return {
                   type:ty,
                   defaultDuration: 10000,
                   label: "★"
               }
            case BuffType.BULLET_BOOST_BIG:     
                return {
                   type:ty,
                   defaultDuration: 60000,
                   label: "B"
               }           
            
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                return {
                   type:ty,
                   defaultDuration: 60000,
                   label: "+2"
               }
                
            case BuffType.SUB_PLANE:
                return {
                   type:ty,
                   defaultDuration: 15000,
                   label: "S"
               }                
        }
        return null
    }

	public getBuff(ty:BuffType, duration:number){
        const t = this
        let buff:Buff
        switch(ty){
            case BuffType.BARRIER:
                if(!t.barrierBuff)t._buffNum ++
                t.barrierBuff = new BarrierBuff(duration);
				buff = t.barrierBuff;
                break;
            case BuffType.BULLET_BOOST_BIG:
                 if(!t.bigBulletBuff)t._buffNum ++
                t.bigBulletBuff = new BigBulletBuff(duration)
				buff = t.bigBulletBuff;
                break;
            case BuffType.BULLET_BOOST_3DIRECT:
                if(!t.direction3BulletBuff)t._buffNum ++
                t.direction3BulletBuff = new Direction3BulletBuff(duration);
				buff = t.direction3BulletBuff;
                break;
            case BuffType.BULLET_BOOST_5DIRECT:
                 if(!t.direction5BulletBuff)t._buffNum ++
                t.direction5BulletBuff = new Direction5BulletBuff(duration);
				buff = t.direction5BulletBuff;
                break;
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                if(!t.directionPlus2BullectBuff)t._buffNum ++
                t.directionPlus2BullectBuff = new DirectionPlus2BullectBuff(duration);
                buff = t.directionPlus2BullectBuff;
                break;
            case BuffType.SUB_PLANE:
                if(!t.subPlaneBuff)t._buffNum ++
                t.subPlaneBuff = new SubPlaneBuff(duration);
				buff = t.subPlaneBuff;
                break;
        }
        if(!buff){
            return
        }
        
        buff.startEffect(t._plane);
        buff.addEventListener(PlayEvents.BUFF_LOSE, t.loseBuff, t)        
    }

    public loseBuff(e:any=null){
        let buff: Buff = e.target;
        switch(buff.getType()){
            case BuffType.BARRIER:
				this.barrierBuff = null;
                break
            case BuffType.BULLET_BOOST_BIG:
				this.bigBulletBuff = null;
                break;
            case BuffType.BULLET_BOOST_3DIRECT:
				this.direction3BulletBuff = null;
				break;
            case BuffType.BULLET_BOOST_5DIRECT:
				this.direction5BulletBuff = null;
                break;
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                this.directionPlus2BullectBuff = null;
                break;
            case BuffType.SUB_PLANE:
				this.subPlaneBuff = null;
                break;
        }
        this._buffNum --
    }

    public loseBuff2(ty:BuffType){
        let buff:Buff;
        switch(ty){
            case BuffType.BARRIER:
                this.barrierBuff && this.barrierBuff.delBuff()
                break;
            case BuffType.BULLET_BOOST_BIG:
                this.bigBulletBuff && this.bigBulletBuff.delBuff() 
                break;
            case BuffType.BULLET_BOOST_3DIRECT:
                this.direction3BulletBuff && this.direction3BulletBuff.delBuff()
                break;
            case BuffType.BULLET_BOOST_5DIRECT:
                this.direction5BulletBuff && this.direction5BulletBuff.delBuff() 
                break;
            case BuffType.BULLECT_BOOST_PLUS2DIRECT:
                this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.delBuff()
                break;
            case BuffType.SUB_PLANE:
                this.subPlaneBuff && this.subPlaneBuff.delBuff() 
                break;
        }
        this._buffNum ++
    }

    public dispose(){
       	this.bigBulletBuff && this.bigBulletBuff.delBuff()
        this.dashInvinsibleBuff && this.dashInvinsibleBuff.delBuff()
        this.direction3BulletBuff && this.direction3BulletBuff.delBuff()
        this.direction5BulletBuff && this.direction5BulletBuff.delBuff()
        this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.delBuff()
        this.barrierBuff && this.barrierBuff.delBuff()
        this.subPlaneBuff && this.subPlaneBuff.delBuff()
    }

    public onPause(){
        this.bigBulletBuff && this.bigBulletBuff.onPause()
        this.dashInvinsibleBuff && this.dashInvinsibleBuff.onPause()
        this.direction3BulletBuff && this.direction3BulletBuff.onPause()
        this.direction5BulletBuff && this.direction5BulletBuff.onPause()
        this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.onPause()
        this.barrierBuff && this.barrierBuff.onPause()
        this.subPlaneBuff && this.subPlaneBuff.onPause()       
    }


    public onResume(){        
        this.bigBulletBuff && this.bigBulletBuff.onResume()
        this.dashInvinsibleBuff && this.dashInvinsibleBuff.onResume()
        this.direction3BulletBuff && this.direction3BulletBuff.onResume()
        this.direction5BulletBuff && this.direction5BulletBuff.onResume()
        this.directionPlus2BullectBuff && this.directionPlus2BullectBuff.onResume()
        this.barrierBuff && this.barrierBuff.onResume()
        this.subPlaneBuff && this.subPlaneBuff.onResume()     
    }

    public get buffNum()
    {
        return this._buffNum
    }
}