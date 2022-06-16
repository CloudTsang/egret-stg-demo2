class TimeLimit extends eui.Component{
	private _curSec:number=0;
	private _totSec:number=0;
	private _count:number=0;
	private _fps:number
	private txt:eui.Label
	public constructor() {
		super()
		this.skinName = "resource/eui_skins/TimeLimit.exml"
		this._fps = egret.MainContext.instance.stage.frameRate
	}
	
	public get usedTime(){
		return this._totSec - this._curSec
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
		t._curSec --
		t.refreshText()
		if(t._curSec == 0){
			t.dispatchEvent(new egret.Event(PlayEvents.GAME_OVER))
			return
		}
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