class SoundManager {
	private _bgm:egret.Sound;
	private _bgmChannel:egret.SoundChannel;
	private _bgmPosition:number;
	private _bgs:{[key:string]:egret.Sound}
	private _curBgmName:string
	private _curLoop:boolean
	private _isPausing:boolean
	private _defaultVolume:number
	private static _ins:SoundManager;

	public constructor() {
		LifecycleCallback.addFunc('bgm', ()=>{this.pause()}, ()=>{this.resume()})
		this._bgs = {}
		this._defaultVolume = 0.5
		//test
		// this._defaultVolume = 0
		// const bgm:egret.Sound = new egret.Sound();
		// bgm.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this)
		// bgm.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFailed, this)
		// this._bgm = bgm
	}

	// public play(name:string, loops:boolean=true, position:number=0){
	// 	this._bgmPosition = position
	// 	this._curLoop = loops
	// 	this._curBgmName = name
	// 	name = name.replace('_mp3', '.mp3')
	// 	this._bgm.load(`resource/assets/bgs/${name}`);
	// }
	// private onLoadComplete(e:egret.Event){
	// 	this._bgmChannel = this._bgm.play(this._bgmPosition, this._curLoop?0:1);
	// 		egret.Tween.get(this._bgmChannel)
	// 		.set({
	// 			volume:0
	// 		})			
	// 		.to({
	// 			volume:0.8
	// 		}, 1000)
	// }
	// private onLoadFailed(e:egret.Event){
	// 	console.error(e.data)
	// }

	public play(name:string, loops:boolean=true){
		if(this._bgm){
			this._bgmChannel.stop();
			// this._bgm.close()	
		}
		this._bgm = RES.getRes(name)
		this._bgm.type = egret.Sound.MUSIC;
		try{
			if(this._isPausing)return
			this._bgmChannel = this._bgm.play(0, loops?0:1);
			this._bgmChannel.volume = this._defaultVolume
		}catch(err){
			console.error(err)
		}	
	}


	public playBgs(name:string){
		let s:egret.Sound 
		if(!this._bgs[name]){
			s = RES.getRes(name) as egret.Sound
		}else{
			s = this._bgs[name]
		}
		if(!s)return
		// if(this._isPausing)return
		s.play(0,1)
	}

	public resume(){
		this._isPausing = false
		if(!this._bgm || !this._bgmChannel){
			return;	
		}
		this._bgmChannel = this._bgm.play(this._bgmPosition, 1);
		this._bgmChannel.volume = this._defaultVolume
		this._bgmChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onResumeOver, this)

	}

	private onResumeOver(e:egret.Event){
		if(!this._bgm || !this._bgmChannel){
			return;	
		}
		this._bgmChannel = this._bgm.play(0, 0);
		this._bgmChannel.volume = this._defaultVolume
	
	}

	public pause(){
		this._isPausing = true
		if(this._bgm && this._bgmChannel){	
			this._bgmPosition = this._bgmChannel.position
			this._bgmChannel.stop();	
		}
	}

	public stop(){
		if(this._bgm && this._bgmChannel){	
			this._bgmChannel.stop();	
			// this._bgm.close()
			this._bgmChannel = null
			this._bgm = null
		}
	}

	public static instance():SoundManager{
		if(!SoundManager._ins){
			SoundManager._ins = new SoundManager();
		}
		return SoundManager._ins
	}
}