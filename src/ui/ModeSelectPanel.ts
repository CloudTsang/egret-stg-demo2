class ModeSelectPanel extends eui.Component{
	private btnMode1:eui.Button
	private btnMode2:eui.Button
	private btnMode3:eui.Button
	public constructor(textSize:number=50) {
		super()
		this.skinName = 'resource/eui_skins/ModeSelectPanel.exml'
		this.once(eui.UIEvent.CREATION_COMPLETE, this.onComplete, this)
	}

	private onComplete(e:any){
		const t = this;
		(t.btnMode1.labelDisplay as eui.Label).size = 50;
		(t.btnMode2.labelDisplay as eui.Label).size = 50;
		(t.btnMode3.labelDisplay as eui.Label).size = 50;
		t.btnMode1.once(egret.TouchEvent.TOUCH_TAP, t.onModeSelected, t)
		t.btnMode2.once(egret.TouchEvent.TOUCH_TAP, t.onModeSelected, t)
		t.btnMode3.once(egret.TouchEvent.TOUCH_TAP, t.onModeSelected, t)
	}

	private onModeSelected(e:egret.TouchEvent){
		const t = this
		const evt = new egret.Event(PlayEvents.START)
		let gm:GameMode
		switch(e.target){
			case t.btnMode1:
				gm = GameMode.TIME_ATTACK
				break
			case t.btnMode2:
				gm = GameMode.INFINITE
				break
			case t.btnMode3:
				gm = GameMode.PRACTICE
				break
		}
		evt.data = {
			mode:gm
		}
		t.dispatchEvent(evt)
	}
}