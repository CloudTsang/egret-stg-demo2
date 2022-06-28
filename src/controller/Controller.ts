class Controller implements IController{
	private static ins:Controller;	
	public static getInstance():Controller{
		if(!Controller.ins){
			Controller.ins = new Controller();
		}
		return Controller.ins;
	}
	private _controllee:BasePlane;
	private _lock:boolean;
	private _shotTriggered:boolean;
	private _spinDirect:-1|0|1
	private _lineSpd:1|0|-1
	private _panel:ControlPanel;

	public constructor() {
		this._spinDirect = 0
		this._lineSpd = 0
		this._lock = true
		this._shotTriggered = false
		document.addEventListener('keydown', (e)=>{this.onKeyDown(e)});
		document.addEventListener('keyup', (e)=>{this.onKeyUp(e)})		
	}

	public setPanel(cp:ControlPanel){
		cp.onDirectChange = (x,y)=>{this.setDirect(x,y)};
		cp.onKeyDown = (e)=>{this.onKeyDown(e)};
		cp.onKeyUp = (e)=>{this.onKeyUp(e)};
		this._panel = cp;		
	}

	public setDirect(x:-1|0|1, y:-1|0|1){
		this._spinDirect = x
		this._lineSpd = y
	}

	public setControllee(p:BasePlane){
		this._controllee = p
	}

	public setLock(v:boolean){
		this._lock = v
	}

	public btnTrigger(e:any=null){	
		const c = this

		//test
		// if(c._lineSpd != 0 || c._spinDirect!=0){
		// 	c._controllee.move(c._lineSpd, c._spinDirect)
		// }
		c._controllee.move(c._lineSpd, c._spinDirect)
		if(c._shotTriggered){
			c._controllee.shot();
		}		
	}

	private onKeyDown(e:any){	
		if(this._lock){
			return;
		}				
		switch(e.keyCode){
			case Keyboard.Z: //射击
				if(!this._shotTriggered){
					this._controllee.shot();
				}
				this._shotTriggered = true;
				break;
			case Keyboard.X: //护盾
				this._controllee.bootBarrier(!this._controllee.isBarrier)
				break;
			case Keyboard.C: //TODO:导弹
				break;
			case Keyboard.LEFT:
				this._spinDirect = -1
				break;
			case Keyboard.UP:
				this._lineSpd = 1
				break;
			case Keyboard.RIGHT:
				this._spinDirect = 1
				break;
			case Keyboard.DOWN:		
				this._lineSpd = -1	
				break;
		}
	}	

	private onKeyUp(e:any){
		switch(e.keyCode){
			case Keyboard.Z: 	
				this._shotTriggered = false;
				break;
			case Keyboard.X: 
				break;
			case Keyboard.C:
				break;
			case Keyboard.LEFT: 
				this._spinDirect = 0
				break;
			case Keyboard.UP:
				this._lineSpd = 0
				break;
			case Keyboard.RIGHT:
				this._spinDirect = 0
				break;
			case Keyboard.DOWN:
				this._lineSpd = 0
				break;
		}
	}
}