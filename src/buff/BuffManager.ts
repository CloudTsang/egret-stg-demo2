class BuffManager {
	public bigBulletBuff:BigBulletBuff;
	public dashInvinsibleBuff:DashInvinsibleBuff;
	public direction3BulletBuff:Direction3BulletBuff;
	public direction5BulletBuff:Direction5BulletBuff;
    public directionPlus2BullectBuff:DirectionPlus2BullectBuff;
	public barrierBuff:BarrierBuff;
	public subPlaneBuff:SubPlaneBuff;
    public boostBuff:BoostBuff;
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
            case BuffType.HIGH_SPEED:
                return {
                    type:ty,
                    defaultDuration:20000,
                    label: "S"
                }   
            case BuffType.HP_RECOVER:
                return {
                    type:ty,
                    defaultDuration:-1,
                    label: "H"
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
            case BuffType.HIGH_SPEED:
                if(!t.boostBuff)t._buffNum ++
                else t.boostBuff.delBuff()
                t.boostBuff = new BoostBuff(duration);
                buff = t.boostBuff
                break
            case BuffType.HP_RECOVER:
                new HPBuff(duration).startEffect(t._plane)
                return
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
            case BuffType.HIGH_SPEED:
                this.boostBuff = null
                break
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
            case BuffType.HIGH_SPEED:
                this.boostBuff && this.boostBuff.delBuff()
                break
        }
        this._buffNum ++
    }

    public dispose(){
        const t = this
       	t.bigBulletBuff && t.bigBulletBuff.delBuff()
        t.dashInvinsibleBuff && t.dashInvinsibleBuff.delBuff()
        t.direction3BulletBuff && t.direction3BulletBuff.delBuff()
        t.direction5BulletBuff && t.direction5BulletBuff.delBuff()
        t.directionPlus2BullectBuff && t.directionPlus2BullectBuff.delBuff()
        t.barrierBuff && t.barrierBuff.delBuff()
        t.subPlaneBuff && t.subPlaneBuff.delBuff()
        t.boostBuff && t.boostBuff.delBuff()

    }

    public onPause(){
        const t = this
        t.bigBulletBuff && t.bigBulletBuff.onPause()
        t.dashInvinsibleBuff && t.dashInvinsibleBuff.onPause()
        t.direction3BulletBuff && t.direction3BulletBuff.onPause()
        t.direction5BulletBuff && t.direction5BulletBuff.onPause()
        t.directionPlus2BullectBuff && t.directionPlus2BullectBuff.onPause()
        t.barrierBuff && t.barrierBuff.onPause()
        t.subPlaneBuff && t.subPlaneBuff.onPause()         
    }


    public onResume(){  
        const t = this      
        t.bigBulletBuff && t.bigBulletBuff.onResume()
        t.dashInvinsibleBuff && t.dashInvinsibleBuff.onResume()
        t.direction3BulletBuff && t.direction3BulletBuff.onResume()
        t.direction5BulletBuff && t.direction5BulletBuff.onResume()
        t.directionPlus2BullectBuff && t.directionPlus2BullectBuff.onResume()
        t.barrierBuff && t.barrierBuff.onResume()
        t.subPlaneBuff && t.subPlaneBuff.onResume()     
    }

    public get buffNum()
    {
        return this._buffNum
    }
}