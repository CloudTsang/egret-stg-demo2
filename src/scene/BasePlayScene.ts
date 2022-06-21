class BasePlayScene  extends egret.Sprite{
    protected _stage = egret.MainContext.instance.stage;
	protected _player:PlayerPlane;
    protected _bgLayer:BgLayer
    protected _playArea:egret.Sprite

	protected _playerController:IController;
    protected _controlPanel:ControlPanel;
	
    protected _radar:Radar
    protected _barrierGauge:BarrierGauge
    protected _hpGauge:HPGauge

    protected _collisionCheckInterval:number = 0;
    /**射出子弹次数 */
    protected _playerBullet:number;
	/**击落敌人数 */
    protected _defeatEnemy:number;
    /**关卡倒计时 */
    protected _timelimit:TimeLimit
	protected _score:number
    
 

    protected mapSizeData:MapSizeData
     protected _gameovered:boolean

     //test
     protected _zoomed:boolean = false

	public constructor(stage:egret.Stage) {
		super()   

        this.width = this._stage.stageWidth;
        this.height = this._stage.stageHeight;

        if(this._zoomed){
            this.scaleX = 0.15
            this.scaleY = 0.15
            this.x += 300
            this.y += 300 
        }
        

        this._bgLayer = new BgLayer(WorldData.MAP_SIZE, this.width, this.height)
        this._bgLayer.addEventListener(PlayEvents.OVER_BORDER, this.onOverBorder, this)
        // window['layer'] = this._bgLayer

        const midx = this.width/2
        const midy = this.height/2

        const pa = new egret.Sprite()
        pa.width = this.width
        pa.height = this.height

        pa.anchorOffsetX = midx
        pa.anchorOffsetY = midy
        pa.x = midx;
        pa.y = midy; 

        pa.addChild(this._bgLayer)
        this._playArea = pa
        this.addChild(pa)

        this.mapSizeData = {
            halfMapSize: WorldData.MAP_SIZE/2,
            halfStageWidth: midx,
            halfStageHeight: midy
        }

        
        LifecycleCallback.addFunc('stage', ()=>{this.pause()}, ()=>{this.resume()})
	}

	public async startPlay(){
        throw new Error("Function not implemented!")
    }

    
    protected initUI(){
        const t = this
        if(egret.Capabilities.os.indexOf("Windows")<0){
            let cp = new ControlPanel(t._stage);
            cp.y = t._stage.stageHeight - cp.height;
            t.addChild(cp);
            t._controlPanel = cp;
            t._playerController.setPanel(cp);
            t._barrierGauge = cp.barrier_gauge
            t._hpGauge = cp.hp_gauge
        }else{
            const bg = new BarrierGauge()
            bg.width = t.width * 0.4
            bg.height = 50
            bg.x = t.width * 0.3
            bg.y = t.height - 100
            t.addChild(bg)
            t._barrierGauge = bg

            const hpg = new HPGauge()
            hpg.width = t.width * 0.4
            hpg.height = 50
            hpg.x = t.width * 0.3
            hpg.y = t.height - 170
            t.addChild(hpg)
            t._hpGauge = hpg
        }
        t._barrierGauge.plane = t._player
        t._barrierGauge.refresh()

        t._hpGauge.plane = t._player
        t._hpGauge.refresh()
		t.initTimeLimit()
       
    }

	protected initTimeLimit(){
		const t = this
		const tl = t._timelimit?t._timelimit:new TimeLimit()
        tl.second = WorldData.GAME_TIME_MINUTES * 60
        tl.width = t.width
        tl.y = 20
        tl.once(PlayEvents.GAME_OVER, t.GameOver, t)
        t.addChild(tl)
        t._timelimit = tl
	}

    protected initRadar(){
        const radar = new Radar(200,30)
        this.addChild(radar)
        this._radar = radar
    }

	protected initPlayer(){
        const tmp = this.mapSizeData.halfMapSize
        let player = new PlayerPlane(WorldData.PLANE_WIDTH, WorldData.PLANE_HEIGHT);
        let ctrller = Controller.getInstance();
        ctrller.setControllee(player);
        this._player = player;        
        this._playerController = ctrller;
        player.x = tmp
        player.y = tmp + this.mapSizeData.halfStageHeight
        player.boot()
        this._bgLayer.addGameObj(player)      
        // player.setBuff(BuffType.BULLET_BOOST_BIG, 3000)
        player.addEventListener(PlayEvents.PLAYER_SHOT, (e)=>{
            this._playerBullet++
        }, this) 
        player.addEventListener(PlayEvents.OVER_BORDER, this.onOverBorder, this)
        return new Promise((resolve, reject)=>{
            egret.Tween.get(player)
            .to({
                    y:tmp
                }, 1000)
            .call(()=>{
                player.refreshPosition()
                ctrller.setLock(false)
                this._radar.regPlayer(player)
            })   
            .call(resolve, this)
        })
                                    
    }  


    protected refreshStage(e:any){
         throw new Error("Function not implemented!")
    }

     /**刷新全部显示对象的目标计算点 */
    protected refreshAllPosition(){
         throw new Error("Function not implemented!")
    } 


    public refreshCamera(){
        const scene = this
        const player = scene._player
        const layer = scene._bgLayer
        
        const px = player.x-scene.mapSizeData.halfMapSize
        const py = player.y-scene.mapSizeData.halfMapSize
        const pr = player.rotation

        layer.setPosition(scene.mapSizeData.halfStageWidth - px, scene.mapSizeData.halfStageHeight - py)
        
        scene._playArea.rotation = -pr
    }

    protected onOverBorder(e:egret.Event){ 
        const scene = this
        const plane = e.currentTarget
        const layer = scene._bgLayer

        let newpx = plane.x
        let newpy = plane.y
        switch(e.data.d){
            case "top":
            newpy = WorldData.MAP_SIZE - plane.y - plane.height
            break
            case 'bottom':
            newpy = WorldData.MAP_SIZE - plane.y + plane.height
            break
            case 'left':
            newpx = WorldData.MAP_SIZE - plane.x - plane.width
            break
            case 'right':
            newpx = WorldData.MAP_SIZE - plane.x + plane.width
            break
        }
        
        plane.x = newpx
        plane.y = newpy
        
        if(plane == scene._player){
            const player = scene._player
            const px = player.x-scene.mapSizeData.halfMapSize
            const py = player.y-scene.mapSizeData.halfMapSize
            const pr = player.rotation

            layer.setPosition(scene.mapSizeData.halfStageWidth - px, scene.mapSizeData.halfStageHeight - py)
        }
    }

    public addChild(child: egret.DisplayObject): egret.DisplayObject{
        if(child instanceof Bullet){
            return this._bgLayer.addChild(child)
        }
        return super.addChild(child)
    }

    protected GameOver(e:any=null){
         throw new Error("Function not implemented!")
    }  

    
    protected cleanStage(){
         throw new Error("Function not implemented!")
    }

    protected pause(){
         throw new Error("Function not implemented!")
    }

    protected resume(){
         throw new Error("Function not implemented!")
    }

    public dispose(){
        this.cleanStage()
        LifecycleCallback.removeFunc('stage')
    }

    
}


interface MapSizeData{
    halfStageWidth:number
    halfStageHeight:number
    halfMapSize:number
}