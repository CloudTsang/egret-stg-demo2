class GameResult extends eui.Component{
	private txt_type:eui.Label
	private txt_hit_type:eui.Label
	private txt_time:eui.Label
	private txt_bullet:eui.Label
	private txt_hit:eui.Label
	private txt_defeat:eui.Label

	private btn_retry:eui.Button
	private _time:number
	private _bullet:number
	private _hit:number
	private _defeat:number
	private _clear:boolean
	private _callBack:(e)=>void
	/**
	 * 结果面板
	 * @param t 时间
	 * @param b 子弹数
	 * @param h 被击中数
	 * @param d 击坠数
	 */
	public constructor(clear:boolean, t:number, b:number, h:number, d:number, retryCb:(e)=>void=null) {
		super();
		this.skinName = 'resource/eui_skins/GameResult.exml'
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initData, this);
		this._clear = clear;
		this._time = t;
		this._bullet = b;
		this._hit = h;
		this._defeat = d;
		this._callBack = retryCb;
	}
	private initData(){
		const t = this
		// if(t._clear){
			// t.txt_type.text = '游戏结束'
			// t.txt_hit_type.text = '被击中次数'
		// }else{
		// 	t.txt_type.text = '游戏结束'
		// 	t.txt_hit_type.text = '击中次数'
		// }
		t.txt_hit.text = t._hit + '次';
		t.txt_bullet.text = t._bullet + '颗';
		t.txt_defeat.text = t._defeat + '分'
		

		let sec = t._time;
		let min = Math.floor(sec/60);
		if(min == 0){
			t.txt_time.text = sec + '秒'
		}else{
			let rest = sec%60;			
			t.txt_time.text = min+ '分 '+rest + '秒'
		}
		
		t.btn_retry.addEventListener(egret.TouchEvent.TOUCH_TAP, t.onClick, t);
	}

	public dispose(){
		this.btn_retry.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.parent && this.parent.removeChild(this)
	}

	private onClick(e:any){
		if(this._callBack){
			this._callBack(e);
		}else{
			this.dispatchEvent(new egret.Event(PlayEvents.CLEAR));
		}
	}
}