class Buff extends egret.EventDispatcher{			
	protected type:BuffType
	protected duration:number
	protected timer:egret.Timer
	protected owner:BasePlane
	protected label:string;
	/**	 
	 * @param type buff类型
	 * @param duration 持续时间
	 * @param label 显示在道具上的文字
	 */
	public constructor(type:BuffType, duration:number, label:string='') {
		super()
		this.type = type
		this.duration = duration
		this.label = label
		if(duration > 0){
			this.timer = new egret.Timer(duration, 1);
			this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.delBuff, this)
		}				
	}

	public onPause(){
		if(!this.timer){
			return;
		}
		this.timer.stop();
	}

	public onResume(){
		if(!this.timer){
			return;
		}
		this.timer.start();
	}

	public delBuff(e:any=null){
		this.owner.loseBuff(this.type)
		this.dispatchEvent(new egret.Event(PlayEvents.BUFF_LOSE));
		this.timer && this.timer.reset();
	}

	public getType():BuffType{
		return this.type
	}

	public startEffect(owner:BasePlane){
		this.owner = owner;
		if(this.timer){
			this.timer.start();
		}		
	}
}