class StageScene  extends egret.Sprite{
    private _stage = egret.MainContext.instance.stage;
	private _player:PlayerPlane;
    private _bgLayer:BgLayer
    private _playArea:egret.Sprite

    private _enemyTimer:egret.Timer
    private _enemy:EnemyPlane[];
	private _playerController:IController;
    private _controlPanel:ControlPanel;
	private _buffRate:number = 0.5;
    private _driftTimer:egret.Timer
    private _drifts:Drift[] 

    private _radar:Radar
    private _barrierGauge:BarrierGauge

    private _collisionCheckInterval:number = 0;
    /**射出子弹次数 */
    private _playerBullet:number;
    /**被击中次数 */
    private _playerHit:number;
    private _defeatEnemy:number;
    /**关卡倒计时 */
    private _timelimit:TimeLimit
    
    private _score:number
    private _rank:number

    public static MAP_SIZE:number = 5000

    private mapSizeData:MapSizeData

	public constructor(stage:egret.Stage) {
		super()   

        this.width = this._stage.stageWidth;
        this.height = this._stage.stageHeight;

        // this.scaleX = 0.15
        // this.scaleY = 0.15

        this._bgLayer = new BgLayer(StageScene.MAP_SIZE, this.width, this.height)
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
            halfMapSize: StageScene.MAP_SIZE/2,
            halfStageWidth: midx,
            halfStageHeight: midy
        }

        // this.x += 300
        // this.y += 300

        
	}

	public async startPlay(){
        const t = this

        t._playerBullet = 0
        t._playerHit = 0
        t._defeatEnemy = 0
        t._score = 0
        t._rank = 0

        t._enemy = []
        t._drifts = []

        t.initRadar()  
		await t.initPlayer();
        await t.createEnemy();
        t.createDrift()
        t.initUI()
        t.onRankUp(null)
        t.addEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);

        t.startEnemyTimer()
        //test
        // window['calc'] = ()=>{
        //     AIConfig.planeCalc(this._player, this._enemy[0])
        // }
        // window['stop'] = ()=> {
        //     t.removeEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
        // }
    }

    
    private initUI(){
        const t = this
        if(egret.Capabilities.os.indexOf("Windows")<0){
            let cp = new ControlPanel(t._stage);
            cp.y = t._stage.stageHeight - cp.height;
            t.addChild(cp);
            t._controlPanel = cp;
            t._playerController.setPanel(cp);
            t._barrierGauge = cp.barrier_gauge
        }else{
            const bg = new BarrierGauge()
            bg.width = t.width * 0.4
            bg.height = 50
            bg.x = t.width * 0.3
            bg.y = t.height - 100
            t.addChild(bg)
            t._barrierGauge = bg
        }
        t._barrierGauge.plane = t._player
        t._barrierGauge.refresh()

        const tl = t._timelimit?t._timelimit:new TimeLimit()
        tl.second = WorldData.GAME_TIME_MINUTES * 60
        tl.width = t.width
        tl.y = 20
        tl.once(PlayEvents.GAME_OVER, t.GameOver, t)
        tl.addEventListener(PlayEvents.RANK_UP, t.onRankUp,t )
        t.addChild(tl)
        t._timelimit = tl
    }

    private initRadar(){
        const radar = new Radar(200,10)
        this.addChild(radar)
        this._radar = radar
    }

	private initPlayer(){
        const tmp = this.mapSizeData.halfMapSize
        let player = new PlayerPlane(WorldData.PLANE_WIDTH, WorldData.PLANE_HEIGHT);
        let ctrller = Controller.getInstance();
        ctrller.setControllee(player);
        this._player = player;        
        this._playerController = ctrller;
        // ctrller.setLock(false)
        // return
        player.x = tmp
        player.y = tmp + this.mapSizeData.halfStageHeight
        player.boot()
        this._bgLayer.addGameObj(player)
       
        // player.setBuff(BuffType.BARRIER, 3000)
        // player.setBuff(BuffType.SUB_PLANE, -1)
        // window['player'] = player

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

    private startEnemyTimer(){
        this._enemyTimer = new egret.Timer(10000);
        this._enemyTimer.addEventListener(egret.TimerEvent.TIMER, this.onEnemyTimer, this)  
        this._enemyTimer.start();
    }

    private onEnemyTimer(){
        const t = this
        if(t._enemy.length < 4) t.createEnemy()
    }

     private createEnemy(){             
        let enemy:EnemyPlane;        
        const ms = StageScene.MAP_SIZE
        let border = Math.floor(Math.random()*4) //随机0-3出现方向
        let ex = 0
        let ey = 0
        let er:0|90|180|270 = 0
        //test
        let ew = WorldData.PLANE_WIDTH
        let eh = WorldData.PLANE_HEIGHT
        let twObj = {}
        //test
        // border = 1
        switch(border){
            case 0: //top
                ex = Math.random()*ms*0.8 + ms*0.1
                ey = -eh;
                er = 180;
                twObj = {y:100}
            break
            case 1: //bottom
                ex = Math.random()*ms*0.8 + ms*0.1
                ey = ms+eh;
                er = 0
                twObj = {y:ms-100-eh}
            break
            case 2: //left
                ex = -eh
                ey = Math.random()*ms*0.8 + ms*0.1
                er = 90
                twObj = {x:100}
            break
            case 3: //right
                ex = ms+eh
                ey = Math.random()*ms*0.8 + ms*0.1
                er = 270
                twObj = {x:ms-100-eh}
            break
        }

        //test
        // ex = this.mapSizeData.halfMapSize+200
        // ey = this.mapSizeData.halfMapSize-300
        // er = 180
        twObj = {}
         
        let difficulty = Math.round(Math.random() * this._rank);  
        // difficulty = 3
        if(difficulty < 2){            
            enemy = new EnemyPlane(ew, eh, er);
        }else if(difficulty < 3){            
            enemy = new EliteEnemyPlane(ew, eh, er);
        }else{
            enemy = new ExtremeEnemyPlane(ew, eh, er);
        }
         
        enemy.x = ex
        enemy.y = ey
        enemy.addEventListener(PlayEvents.OVER_BORDER, this.onOverBorder, this)
        this._bgLayer.addGameObj(enemy)
       
        enemy.boot()
        return new Promise((resolve, reject)=>{
            egret.Tween.get(enemy)
            .to(twObj, 1000)
            .call(()=>{
                enemy.refreshPosition()
                this._enemy.push(enemy);    
                this._radar.regObject(enemy) 
        }, this)
        .call(resolve, this)
        })
    }

    /**开启漂流物生成timer */
    private createDrift(){
        this._driftTimer = new egret.Timer(5000);
        this._driftTimer.addEventListener(egret.TimerEvent.TIMER, this.onDriftTimer, this)  
        this._driftTimer.start();
    }  

    private onDriftTimer(e:any){  
        const t = this
        let tmp = 0
        //test
        // while(tmp<t._drifts.length){
        //     const d = t._drifts[tmp]
        //     if(!d.timePassed()){
        //         d.dispose()
        //         t._radar.removeObject(d)
        //         t._drifts.splice(tmp, 1)
        //     }else{
        //         tmp ++
        //     }
        // }
        if(t._driftTimer.currentCount%10 != 0){
            return;
        }
        if(Math.random()<t._buffRate || t._drifts.length >= 2) {
            //test
            return;
        }
        let d = new Drift()
        const rangeA = StageScene.MAP_SIZE * 0.2
        const rangeB = rangeA * 3
        d.x = Math.random()*rangeB+rangeA
        d.y = Math.random()*rangeB+rangeA
        d.refreshPosition()
        t._radar.regObject(d)
        t._bgLayer.addChild(d)
        t._drifts.push(d)
    }

    private refreshStage(e:any){
        const scene = this
        //自机操作的刷新
        scene._playerController.btnTrigger()
        scene.refreshAllPosition()
        scene.refreshCamera()
        scene._radar.refresh()
        scene._barrierGauge.refresh()
        //test
        scene._timelimit.refresh()
        // return
        if(scene._collisionCheckInterval!=3){
            //每3帧进行一次碰撞检测            
            scene._collisionCheckInterval++
            return;
        }     
        scene._collisionCheckInterval=0;

        //自机和敌机的碰撞
        if(WorldData.PLANE_CRASH){
            for(let e of this._enemy){           
                if(this._player.collisionCheck(e)){
                    this._player.crash();                    
                    this.GameOver();
                    return;
                }
            }
        }
        
        //自机子弹的碰撞检测
        for(let b of Bullet.allArr){            
            if(b.activate){                
                let hasChecked:boolean = false;           
                for(let i=0; i<scene._enemy.length; i++){
                    let e = scene._enemy[i];     
                    if(b.collisionCheck(e)){
                        console.log('enemy hit.');
                        const guarded:boolean = e.hit(b);
		                SoundManager.instance().playBgs("hit_mp3")
                        b.dispose(guarded)
                        hasChecked = true
                        if(e.isDefeated()) {
                            SoundManager.instance().playBgs("explode_mp3")
                            e.crash();
                            e.removeEventListener(PlayEvents.OVER_BORDER, scene.onOverBorder, scene)
                            scene._score += e.score
                            scene._radar.removeObject(e)
                            scene._enemy.splice(i,1);
                            scene._defeatEnemy ++
                        }
                        break;
                    }  

                }  
                for(let i=0; i<scene._drifts.length; i++){
                    let d = scene._drifts[i]
                    if(b.collisionCheck(d) && !hasChecked){
                        b.dispose();
                        d.hit(b);
                        SoundManager.instance().playBgs("hit_mp3")
                        if(d.isDefeated()) d.change2Buff();                    
                    }   
                }                                     
            }
        }

        //敌机子弹的碰撞检测
        for(let b of EnemyBullet.allArr){
            if(b.activate){                
                let hasChecked:boolean = false;           
                if(b.collisionCheck(this._player)){     
                    console.log("player hit");
                    const guarded = this._player.hit(b);
                    SoundManager.instance().playBgs("hit_mp3")
                    hasChecked = true
                    b.dispose(guarded);
                    if(!guarded){
                       this._playerHit ++; 
                    }
                    
                    if(this._player.isDefeated()){
                         SoundManager.instance().playBgs("explode_mp3")
                        this._player.crash();                    
                        this.GameOver();
                        return;
                    }                    
                    break;
                }  
                if(!hasChecked){
                     for(let i=0; i<scene._drifts.length; i++){
                        let d = scene._drifts[i]
                        if(b.collisionCheck(d) && !hasChecked){
                            b.dispose();
                            d.hit(b);
                            // SoundManager.instance().playBgs("hit_mp3")
                            if(d.isDefeated()) d.change2Buff();                    
                        }   
                    } 
                }                
            }
        }  
             

        //拾取漂流物判断   
        let tmpdi = 0
        while(tmpdi<scene._drifts.length){
            const d = scene._drifts[tmpdi]
            if(!d.buff){
                tmpdi ++
                continue
            }
            let hasPicked = false
            if(d.collisionCheck(scene._player)){
                scene._player.setBuff(d.buff.type, d.buff.defaultDuration);
                hasPicked = true;
            }
            if(!hasPicked && WorldData.ENEMY_DRIFT){
                for(let e of this._enemy){
                    if(d.collisionCheck(e)){
                        e.setBuff(d.buff.type, d.buff.defaultDuration);
                        hasPicked = true;
                        break;
                    }
                }
            }
            if(hasPicked){
                d.dispose()
                scene._radar.removeObject(d)
                scene._drifts.splice(tmpdi, 1)
            }else{
                tmpdi ++
            }
        }

    }

     /**刷新全部显示对象的目标计算点 */
    private refreshAllPosition(){
        const scene = this
        scene._player.refreshPosition();

        for(let e0 of scene._enemy){
            let e = e0 as EnemyPlane
            //test
            e.refreshPosition();  
            e.refreshAI(scene._player, scene._drifts)  
            e.refreshMove(); 
        }

        for(let b of Bullet.allArr){
            if(b.activate){
                b.onFly();     
                b.refreshPosition();
            }
        }

        for(let b of EnemyBullet.allArr){
            if(b.activate){
                b.onFly();     
                b.refreshPosition();
            }
        }
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
        // console.log('overborder : ',e.data.d)
        switch(e.data.d){
            case "top":
            newpy = StageScene.MAP_SIZE - plane.y - plane.height
            break
            case 'bottom':
            newpy = StageScene.MAP_SIZE - plane.y + plane.height
            break
            case 'left':
            newpx = StageScene.MAP_SIZE - plane.x - plane.width
            break
            case 'right':
            newpx = StageScene.MAP_SIZE - plane.x + plane.width
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

    private GameOver(e:any=null){
        console.log("game over.")
        // return
        this.cleanStage();
        let gr = new GameResult(false, this._timelimit.usedTime, this._playerBullet, this._playerHit, this._score, (e)=>{
            gr.dispose()
            this.startPlay();
        });
        gr.x = (this._stage.stageWidth - gr.width)/2;
        gr.y = 100;
        this.parent.addChild(gr);  
    }  

    private onRankUp(e:any){
        if(this._rank == 3){
            return
        }
        this._rank ++
        let bgmName = ''       
        switch(this._rank){
            case 1:
            bgmName = 'normal_mp3'
            break
            case 2:
            bgmName = 'elite_mp3'
            break
            case 3:
            bgmName = 'extreme_mp3'
            break
        }
        if(bgmName.length > 0){
            SoundManager.instance().play(bgmName);
        }
    }


    private cleanStage(){
        const t = this
        try{             
            t._bgLayer.resetPosition()
        
             t._playArea.rotation = 0

            t.removeEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
            t._player.crash();            
            t._player = null;            
            for(let e of t._enemy){
                e.crash();
            }
            t._enemy = []
            t._driftTimer.stop();
            t._driftTimer.removeEventListener(egret.TimerEvent.TIMER, t.onDriftTimer, t)  ;
            t._driftTimer = null;  
            t._enemyTimer.stop()
            t._enemyTimer.removeEventListener(egret.TimerEvent.TIMER, t.onEnemyTimer, t)
            t._enemyTimer = null          
            t._drifts.forEach((d, i)=>{
                d.dispose()
            })      
            t._drifts = null
            
            t._radar.dispose()

            if(t._controlPanel)t.removeChild(t._controlPanel);

            for(let b of Bullet.allArr){
                b.disposeImmediately()
            }   
            for(let b of EnemyBullet.allArr){
                b.disposeImmediately()
            }                                         
        }catch(e){
            console.log(e);
        }
    }

    
}

interface MapSizeData{
    halfStageWidth:number
    halfStageHeight:number
    halfMapSize:number
}