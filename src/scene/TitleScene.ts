class TitleScene  extends egret.Sprite
{
	private _descript: DescriptionPage
	private _msPanel:ModeSelectPanel
	private _startBtn: eui.Button;
	private _desBtn:eui.Button;
	private _stage = egret.MainContext.instance.stage;
	private bgm:egret.Sound
	private soundChannel:egret.SoundChannel;
	public constructor(stage:egret.Stage) {
		super();		 
		 
		this.x = 0;
		this.y = 0;    
		this.width = this._stage.stageWidth;
		this.height = this._stage.stageHeight;

		const title = new eui.Component()
		title.skinName = 'resource/eui_skins/Title.exml'
		title.width = this.width
		title.y = 50
		this.addChild(title)
		
		const sbtn = this.createBtn("开始游戏")
		sbtn.x = (this.width - sbtn.width)/2;
		sbtn.y = this.height - 350;
		this.addChild(sbtn);
		sbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.modeSelect, this)
		this._startBtn = sbtn

		const dbtn = this.createBtn("游戏说明")
		dbtn.x = (this.width - dbtn.width)/2;
		dbtn.y = this.height - 150;
		dbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openDescript, this)
		this.addChild(dbtn);
		this._desBtn = dbtn

		SoundManager.instance().play('title_mp3');
	}

	private gameStart(e:any){
		this.dispatchEvent(e)
	}

	private modeSelect(e:any){
		const t = this
		t.removeChild(t._startBtn)
		t.removeChild(t._desBtn)

		const msp = new ModeSelectPanel()
		msp.x = (t.width - msp.width)/2
		msp.y = t.height - msp.height
		t.addChild(msp)
		t._msPanel = msp
		msp.once(PlayEvents.START, t.gameStart, t)
	}

	public openDescript(e:any){
		const t = this
		t._descript = new DescriptionPage();
		t._descript.x = (t._stage.stageWidth - t._descript.width)/2;
		t._descript.y = t._stage.stageHeight - t._descript.height-100;
		t.addChild(t._descript);
		t._descript.once(PlayEvents.CLOSE_DESCRIPT, t.closeDescript, t)

		t._startBtn.visible = false
		t._desBtn.visible = false
	}

	private closeDescript(e:any){
		const t = this
		if(!t._descript){
			return
		}
		t._descript.parent.removeChild(t._descript)
		t._descript = null
		t._startBtn.visible = true
		t._desBtn.visible = true
	}

	private createBtn(label:string, textSize:number=50):eui.Button{
		const btn = new eui.Button();
		btn.skinName = 'resource/eui_skins/ButtonSkin.exml'
		btn.label = label	
		btn.width = 300;
		btn.height = 100;
		(btn.labelDisplay as eui.Label).size = textSize;
		return btn
	}

	public dispose(){
		
		this.removeChildren()
		this.parent.removeChild(this)
	}
}