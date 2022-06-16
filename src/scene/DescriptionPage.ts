class DescriptionPage extends eui.Component{
	private btn_next:eui.Button
	private _curPage:number
	public constructor() {
		super()
		this.touchEnabled = true
		this.touchChildren = true
		this.skinName = 'resource/eui_skins/Description.exml'
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this)
		this._curPage = 0
	}

	public dispose(){
		this.btn_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNext, this)
	}

	private onNext(e:any){
		if(this._curPage == 4){
			this.dispatchEvent(new egret.Event(PlayEvents.CLOSE_DESCRIPT))
			return
		}
		this.currentState = `p${++this._curPage}`

	}
}