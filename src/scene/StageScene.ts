class StageScene  extends BasePlayScene{

    protected _enemyTimer:egret.Timer
    protected _enemy:EnemyPlane[];
    protected _maxEnemy:number

	protected _buffRate:number = 0.8;
    protected _driftTimer:egret.Timer
    protected _drifts:Drift[] 

    /**被击中次数 */
    protected _playerHit:number;
    
    protected _rank:number


	public constructor(stage:egret.Stage) {
		super(stage)   

	}

	public async startPlay(){
        const t = this

        t._playerBullet = 0
        t._playerHit = 0
        t._defeatEnemy = 0
        t._score = 0
        t._rank = 0
        t._gameovered = false
        t._maxEnemy = 4

        t._enemy = []
        t._drifts = []

        t.initRadar()  
		await t.initPlayer();
        // await t.createEnemy();
        t.startCreateEnemy()
        t.createDrift()
        t.initUI()
        t.onRankUp(null)
        t.addEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);

        t.startEnemyTimer()

    }

    
    protected initUI(){
        super.initUI()
        this._timelimit.addEventListener(PlayEvents.RANK_UP, this.onRankUp,this )
    }

    private startEnemyTimer(){
        this._enemyTimer = new egret.Timer(10000);
        this._enemyTimer.addEventListener(egret.TimerEvent.TIMER, this.onEnemyTimer, this)  
        this._enemyTimer.start();
    }

    private onEnemyTimer(){
        const t = this
        if(t._enemy.length < t._maxEnemy) t.createEnemy()
    }

    protected enemyFactory(ew:number, eh:number, er:0|90|180|270){
        let enemy:EnemyPlane
        let difficulty = this._rank
        // difficulty = 2
        const tmp = Math.random()
        //每个阶段的敌机刷新，有1/4几率等级-1， 1/8几率等级-2
        if(tmp < 0.125){
            difficulty -= 2
        }else if(tmp < 0.25){
            difficulty -= 1
        }
        if(difficulty <= 1){           
            enemy = new EnemyPlane(ew, eh, er);
        }else if(difficulty <= 2){         
            enemy = new EliteEnemyPlane(ew, eh, er);
        }else{
            enemy = new ExtremeEnemyPlane(ew, eh, er);
        }
        return enemy
    }

    private startCreateEnemy(){
        const t = this
        let ew = WorldData.PLANE_WIDTH
        let eh = WorldData.PLANE_HEIGHT
        const span = 1000
        for(let i=0; i<4; i++){
            let ex = 0
            let ey = 0
            let er:0|90|180|270 = 0

            switch(i){
                case 0: //top
                    ex = t._player.x + Math.random()*t.width - t.width/2
                    ey = t._player.y - t.height/2 - eh - span;
                    er = 180;
                break
                case 1: //bottom
                    ex = t._player.x + Math.random()*t.width - t.width/2
                    ey = t._player.y + t.height/2 + eh + span;
                    er = 0
                break
                case 2: //left
                    ex = t._player.x - t.width/2 - eh - span
                    ey = t._player.y + Math.random()*t.height - t.height/2
                    er = 90
                break
                case 3: //right
                    ex = t._player.x + t.width/2 + eh + span
                    ey = t._player.y + Math.random()*t.height - t.height/2
                    er = 270
                break
            }
            let enemy = new EnemyPlane(ew, eh, er);
            //test
            // let enemy = new EliteEnemyPlane(ew, eh, er)
            // let enemy = new ExtremeEnemyPlane(ew, eh, er)
            enemy.x = ex
            enemy.y = ey
            enemy.boot()
            enemy.addEventListener(PlayEvents.OVER_BORDER, this.onOverBorder, this)
            enemy.refreshPosition()
            t._bgLayer.addGameObj(enemy)
            t._enemy.push(enemy);    
            t._radar.regObject(enemy) 
        }
    }

     private createEnemy(){             
        let enemy:EnemyPlane;        
        const ms = WorldData.MAP_SIZE
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
         
        enemy = this.enemyFactory(ew,eh,er)
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
        if(Math.random()>t._buffRate || t._drifts.length >= 3) {
            //test
            return;
        }
        let d = new Drift()
        const rangeA = WorldData.MAP_SIZE * 0.2
        const rangeB = rangeA * 3
        d.x = Math.random()*rangeB+rangeA
        d.y = Math.random()*rangeB+rangeA
        d.refreshPosition()
        t._radar.regObject(d)
        t._bgLayer.addChild(d)
        t._drifts.push(d)
    }

    protected refreshStage(e:any){
        const scene = this
        if(scene._gameovered)return
        //自机操作的刷新
        scene._playerController.btnTrigger()
        scene.refreshAllPosition()
        scene.refreshCamera()
        scene._radar.refresh()
        scene._barrierGauge.refresh()
        
        //test
        scene._timelimit.refresh()
        // return
        
        if(scene._collisionCheckInterval!=2){
            //每x帧进行一次碰撞检测            
            scene._collisionCheckInterval++
            return;
        }     
        scene._collisionCheckInterval=0;

        //自机和敌机的碰撞
        if(WorldData.PLANE_CRASH){
            for(let e of scene._enemy){           
                if(scene._player.collisionCheck(e)){
                    scene._player.crash();                    
                    scene.GameOver();
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
                if(b.collisionCheck(scene._player)){     
                    console.log("player hit");
                    const hit = scene._player.hit(b);
                    scene._hpGauge.refresh()
                    SoundManager.instance().playBgs("hit_mp3")
                    hasChecked = true
                    b.dispose(hit);
                    if(hit){
                       scene._playerHit ++; 
                    }
                    
                    if(scene._player.isDefeated()){
                         SoundManager.instance().playBgs("explode_mp3")
                        scene._player.crash();                    
                        scene.GameOver();
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
                scene._hpGauge.refresh()
                SoundManager.instance().playBgs("item_mp3")
            }
            if(!hasPicked && WorldData.ENEMY_DRIFT){
                for(let e of scene._enemy){
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
    protected refreshAllPosition(){
        const scene = this
        scene._player && scene._player.refreshPosition();

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

    protected GameOver(e:any=null){
        console.log("game over.")
        const t = this
        t._gameovered = true
        t.cleanStage();
        let gr = new GameResult(false, 
        t._timelimit.usedTime, 
        t._playerBullet, 
        t._playerHit, 
        t._score, (e)=>{
            gr.dispose()
            // t.startPlay();
            this.dispatchEvent(new egret.Event(PlayEvents.BACK_2_TITLE))
        });
        gr.x = (t._stage.stageWidth - gr.width)/2;
        gr.y = 100;
        t.parent.addChild(gr);  
    }  

    protected onRankUp(e:any){
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


    protected cleanStage(){
        const t = this
        try{             
            // t._bgLayer.resetPosition()
            t._bgLayer.dispose() 
             t._playArea.rotation = 0
            t.removeEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
            t._player && t._player.crash();            
            t._player = null;            
            for(let e of t._enemy){
                e.crash();
            }
            t._enemy = []
            if(t._driftTimer){
                t._driftTimer.stop();
                t._driftTimer.removeEventListener(egret.TimerEvent.TIMER, t.onDriftTimer, t)  ;
                t._driftTimer = null; 
            }
             if(t._enemyTimer){
                  t._enemyTimer.stop()
                t._enemyTimer.removeEventListener(egret.TimerEvent.TIMER, t.onEnemyTimer, t)
                t._enemyTimer = null  
             }
            if(t._drifts){
                t._drifts.forEach((d, i)=>{
                    d.dispose()
                })      
                t._drifts = []
            }   

            t._timelimit.parent && t._timelimit.parent.removeChild(t._timelimit)
            t._radar && t._radar.dispose()

            if(t._controlPanel){
                t.removeChild(t._controlPanel);
                t._controlPanel = null
            }

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

    protected pause(){
        const t = this
        if(t._gameovered) return
        t.removeEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
        t._driftTimer && t._driftTimer.stop()
        t._enemyTimer && t._enemyTimer.stop()
    }

    protected resume(){
        const t = this
        if(t._gameovered) return
        t.addEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
        t._driftTimer && t._driftTimer.start()
        t._enemyTimer && t._enemyTimer.start()

    }   
}
