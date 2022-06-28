class ExplodeBuff  extends Buff{
	public constructor(duration=-1) {
		super(BuffType.CLEAN_ENEMY, duration, "E")	
	}

	public startEffect(owner:BasePlane){
		this.owner = owner
		if(owner instanceof PlayerPlane){
			let evt = new egret.Event(PlayEvents.BUFF_GAIN)
			evt.data = {
				ty: this.type
			}
			owner.dispatchEvent(evt)
		}
	}
}