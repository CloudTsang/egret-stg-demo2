class ControlPanel extends eui.Component{
	private btn_shot:eui.Button;
	private btn_barrier:eui.Button;
	private btn_missle:eui.Button
	private analog:eui.Component;
	private _stage:egret.Stage;

	private _curAnalogX:-1|0|1 = 0;
	private _curAnalogY:-1|0|1 = 0;
	private _stageAnalogX:number = 0;
	private _stageAnalogY:number = 0;

	public hp_gauge:HPGauge
	public lock_gauge_disp:eui.Rect
	public barrier_gauge_disp:eui.Rect

	public lock_gauge:MissleGauge
	public barrier_gauge:BarrierGauge;

	protected test_gauge:CoolingQueueMcForCircle

	public onDirectChange:(x:-1|0|1, y:-1|0|1)=>void
	public onKeyDown:(e:{keyCode:Keyboard})=>void
	public onKeyUp:(e:{keyCode:Keyboard})=>void

	public constructor(stage:egret.Stage) {
		super();
		this.skinName = 'resource/eui_skins/ControlPanel.exml'
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initData, this);
		this._stage = stage;
	}

	private initData(e:any){
		const t = this
		t.width = t._stage.stageWidth;		
		t.btn_shot.x = t.width - t.btn_shot.width;
		t.btn_barrier.parent.x = t.btn_shot.x	
		t.btn_missle.parent.x = t.btn_shot.x

		t.btn_shot.addEventListener(egret.TouchEvent.TOUCH_BEGIN, t.onPressShot, t)	
		t.btn_shot.addEventListener(egret.TouchEvent.TOUCH_END, t.onReleaseShot, t)
		t.btn_shot.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, t.onReleaseShot, t)

		t.analog.addEventListener(egret.TouchEvent.TOUCH_BEGIN, t.onPressAnalog, t)		
		t.analog.addEventListener(egret.TouchEvent.TOUCH_MOVE, t.onPressAnalog, t)
		t.analog.addEventListener(egret.TouchEvent.TOUCH_END, t.onReleaseAnalog, t)
		t.analog.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, t.onReleaseAnalog, t)
		t._stageAnalogX = t.analog.x + t.x;
		t._stageAnalogY = t.analog.y + t.y;

		// t.barrier_gauge.x = t.btn_barrier.x - t.barrier_gauge.height
		// t.barrier_gauge.y = t.btn_barrier.y + t.barrier_gauge.width - t.btn_barrier.width * 0.1
		// t.barrier_gauge.width = t.btn_barrier.width * 0.8

		// t.lock_gauge.x = t.btn_missle.x - t.lock_gauge.height
		// t.lock_gauge.y = t.btn_missle.y + t.btn_missle.width - t.btn_missle.width * 0.1
		// t.lock_gauge.width = t.btn_missle.width * 0.8

		t.lock_gauge = new MissleGauge(t.lock_gauge_disp, t.btn_missle, t.btn_missle.width/2)
		t.barrier_gauge = new BarrierGauge(t.barrier_gauge_disp, t.btn_barrier.width/2)

		t.hp_gauge.x = t.btn_shot.x
		t.hp_gauge.width = t.btn_shot.width

		t.btn_barrier.addEventListener(egret.TouchEvent.TOUCH_TAP, t.onPressBarrier, t)
		t.btn_missle.addEventListener("touchTap", t.onMissle, t)
	}

	private onPressShot(e){
		this.onKeyDown && this.onKeyDown({keyCode:Keyboard.Z});
	}

	private onReleaseShot(e){
		this.onKeyUp && this.onKeyUp({keyCode:Keyboard.Z});
	}

	private onPressBarrier(e){
		this.onKeyDown && this.onKeyDown({keyCode:Keyboard.X});
	}

	private onMissle(e){
		this.onKeyDown && this.onKeyDown({keyCode:Keyboard.C});
	}

	private onPressAnalog(e:egret.TouchEvent){
		let dx:-1|0|1 = 0;
		let dy:-1|0|1 = 0;
		switch(e.target.name){
			case "leftup":
				dx = -1;dy = 1
				break
			case "up":
				dx = 0;dy = 1
				break
			case "rightup":
				dx = 1;dy = 1
				break
			case "left":
				dx = -1;dy = 0
				break
			case "right":
				dx = 1;dy = 0
				break
			case "leftdown":
				dx = -1;dy = -1
				break
			case "down":
				dx = 0;dy=-1
				break
			case "rightdown":
				dx = 1;dy=-1
				break
			default:
				return
		}
		
		if(dx == this._curAnalogX && dy == this._curAnalogY){
			return;
		}	
		this._curAnalogX = dx;
		this._curAnalogY = dy;
		this.onDirectChange(dx, dy);
	
	}

	private onReleaseAnalog(e){
		this._curAnalogX = 0;
		this._curAnalogY = 0;
		this.onDirectChange && this.onDirectChange(this._curAnalogX, this._curAnalogY);
	}

}