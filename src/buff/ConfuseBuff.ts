class ConfuseBuff  extends Buff{
	public constructor(duration=20000) {
		super(BuffType.CONFUSE_ENEMY, duration, "C")	
	}

	public startEffect(owner:BasePlane){
		this.owner = owner
		if(owner instanceof PlayerPlane){
			let evt = new egret.Event(PlayEvents.BUFF_GAIN)
			evt.data = {
				ty: this.type
			}
			owner.dispatchEvent(evt)
			console.log("敌机行为模式锁定为减速回旋停火")
			if(this.timer){
				this.timer.start();
			}
		}
	}

	public delBuff(e:any=null){
		let evt = new egret.Event(PlayEvents.BUFF_LOSE)
		evt.data = {
			ty: this.type
		}
		this.owner.dispatchEvent(evt)
		this.timer && this.timer.reset();
		console.log("敌机行为模式解锁")
	}
}