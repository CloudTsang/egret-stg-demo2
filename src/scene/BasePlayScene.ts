class BasePlayScene  extends egret.Sprite{
    protected _stage = egret.MainContext.instance.stage;
	protected _player:PlayerPlane;
    protected _bgLayer:BgLayer
    protected _playArea:egret.Sprite

	protected _playerController:IController;
    protected _controlPanel:ControlPanel;
    
    protected _enemy

    protected _radar:Radar
    protected _barrierGauge:BarrierGauge|BarrierGaugePC
    protected _hpGauge:HPGauge
    protected _missleGauge:MissleGauge|MissleGaugePC

    protected _collisionCheckInterval:number = 0;
    protected _maxCollisionCheckInterval:number = 2
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
        //test
        // this._bgLayer.scaleX = 5
        // this._bgLayer.scaleY = 5

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
            t._missleGauge = cp.lock_gauge
        }else{
            const bg = new BarrierGaugePC()
            bg.width = t.width * 0.4
            bg.height = 50
            bg.x = t.width * 0.3
            bg.y = t.height - 100
            t.addChild(bg)
            t._barrierGauge = bg

            const mg = new MissleGaugePC()
            mg.width = t.width * 0.4
            mg.height = 50
            mg.x = t.width * 0.3
            mg.y = t.height - 150
            t.addChild(mg)
            t._missleGauge = mg

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
        t._missleGauge.plane = t._player
        t._missleGauge.refresh()
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
        player.addEventListener(PlayEvents.BUFF_GAIN, this.onPlayerGetBuff, this)
        player.addEventListener(PlayEvents.BUFF_LOSE, this.onPlayerLoseBuff, this)
        player.missleLaucher.addEventListener(PlayEvents.MISSLE_HIT, this.onMissleBlast, this)
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

    protected onMissleBlast(evt:egret.Event){
        const t = this
        const missle = evt.data.missle as Missle
        const tgt = missle.tgt
        const ptc = missle.blast()
        ptc.x = tgt.position.x
        ptc.y = tgt.position.y
        ptc.start(300)
        t._bgLayer.addChild(ptc)
        ptc.once(egret.Event.COMPLETE, (e)=>{
            ptc.parent && ptc.parent.removeChild(ptc)
        }, t)
        SoundManager.instance().playBgs("explode_mp3")
        let newEnemys = []
        for(let i=0; i<t._enemy.length; i++){
            let e = t._enemy[i]
            let e1 = e as IDefeatable
            if(e == tgt){
                e1.hit2(missle.planeDamage)
            }else if(egret.Point.distance(e1.position, tgt.position) < missle.dmgDistance){
                // console.log("sub damage")
                e1.hit2(missle.subDamage)
            }
            if(e1.isDefeated()){
                SoundManager.instance().playBgs("explode_mp3")
                e1.crash();
                e1.removeEventListener(PlayEvents.OVER_BORDER, t.onOverBorder, t)
                t._score += e1.score
                t._radar.removeObject(e as CollisionObject)
                
                t._defeatEnemy ++
            }else{
                newEnemys.push(e)
            }
        }
        missle.dispose()
        t._enemy = newEnemys
    }

    protected onPlayerGetBuff(e:egret.Event){
        throw new Error("Function not implemented!")
    }

    protected onPlayerLoseBuff(e:egret.Event){
        throw new Error("Function not implemented!")
    }

    public addChild(child: egret.DisplayObject): egret.DisplayObject{
        if(child instanceof Bullet || child instanceof Missle){
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