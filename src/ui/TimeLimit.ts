class TimeLimit extends eui.Component{
	private _curSec:number=0;
	private _totSec:number=0;
	private _count:number=0;
	private _fps:number
	private txt:eui.Label
	private _step:number
	private _triggerTime:number
	/**
	 * @param trgTime 时限，计时器经过该时间将触发游戏结束事件
	 * @param step 增长步长，-1为倒计时
	 */
	public constructor(step:-1|1 = -1,trgTime:number=0) {
		super()
		this.skinName = "resource/eui_skins/TimeLimit.exml"
		this._fps = egret.MainContext.instance.stage.frameRate
		this._step = step
		this._triggerTime = trgTime
	}
	
	public get usedTime(){
		return this._totSec + this._curSec * this._step
	}

	public set second(v:number){
		this._totSec = v
		this._curSec = v
		this._count = 0
		this.refreshText()
	}

	public refresh(){
		const t = this
		t._count ++
		if(t._count < t._fps){
			return
		}
		t._count = 0
		t._curSec += t._step
		t.refreshText()
		if(t._curSec == t._triggerTime){
			t.dispatchEvent(new egret.Event(PlayEvents.GAME_OVER))
			return
		}
		//test
		if(t._curSec % 60 == 0){
			//一分钟经过进入下一阶段
			t.dispatchEvent(new egret.Event(PlayEvents.RANK_UP))
		}
	}

	private refreshText(){
		const t = this
		const min = Math.floor(t._curSec / 60);
		const sec2 = t._curSec % 60;
		if(t.txt)t.txt.text = `${min}:${sec2<10?`0${sec2}`:sec2}`;
	}
}