class PracticeScene  extends BasePlayScene{
    protected _enemy:DummyTgt[]
	public constructor(stage:egret.Stage) {
		super(stage)   
	}

    protected initTimeLimit(){
        const t = this
		const tl = t._timelimit?t._timelimit:new TimeLimit(1, -1)
        tl.second = 0
        tl.width = t.width
        tl.y = 20
        tl.once(PlayEvents.GAME_OVER, t.GameOver, t)
        t.addChild(tl)
        t._timelimit = tl
	}

	public async startPlay(){
        const t = this

        t._playerBullet = 0
        t._gameovered = false
        t._defeatEnemy = 0
        t._score = 0

        t.initRadar()  
		await t.initPlayer();
        t.initTgt()
        t.initUI()
        t.addEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
        SoundManager.instance().play('normal_mp3');

        t.addChild(t._player.missleLaucher.lockShape)
    }

    private initTgt(){
        const t = this
        t._enemy = []
        //test
        for(let i=0; i<10; i++){
            const tgt = new DummyTgt()
            tgt.x = Math.random()*(WorldData.MAP_SIZE - 200) + 100
            tgt.y = Math.random()*(WorldData.MAP_SIZE - 200) + 100
            tgt.refreshPosition()
            t._bgLayer.addGameObj(tgt)
            t._enemy.push(tgt);    
            t._radar.regObject(tgt) 
        }
    }

    protected refreshStage(e:any){
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
        
        if(scene._collisionCheckInterval!=2){
            //每x帧进行一次碰撞检测            
            scene._collisionCheckInterval++
            return;
        }     
        scene._collisionCheckInterval=0

        scene._player.missleLaucher.refresh(scene._enemy)
        scene._missleGauge.refresh()
       
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
                            if(scene._enemy.length == 0){
                                scene.GameOver()
                                return
                            }
                        }
                        break;
                    }  

                }                   
            }
        }

    }

     /**刷新全部显示对象的目标计算点 */
    protected refreshAllPosition(){
        const scene = this
        scene._player && scene._player.refreshPosition();

        for(let b of Bullet.allArr){
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
        0, 
        t._score,
         (e)=>{
            gr.dispose()
            // this.startPlay();
            this.dispatchEvent(new egret.Event(PlayEvents.BACK_2_TITLE))
        });
        gr.x = (t._stage.stageWidth - gr.width)/2;
        gr.y = 100;
        t.parent.addChild(gr);  
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
            t._radar && t._radar.dispose()

            t._timelimit.parent && t._timelimit.parent.removeChild(t._timelimit)

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
    }

    protected resume(){
        const t = this
        if(t._gameovered) return
        t.addEventListener(egret.Event.ENTER_FRAME, t.refreshStage, t);
    }
}
