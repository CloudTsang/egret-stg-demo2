class InfiniteScene  extends StageScene{
    private lvData = LevelData.instance
	public constructor(stage:egret.Stage) {
		super(stage)   
        this.lvData.init()
	}

    protected enemyFactory(ew:number, eh:number, er:0|90|180|270){
        let enemy:EnemyPlane = new LevelEnemyPlane(this.lvData.curLv, ew, eh, er)
        return enemy
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


    protected onRankUp(e:any){
        this.lvData.levelUp()
        const lv = this.lvData.curLv
        let bgmName = ''
        switch(lv){
            case 1:
                bgmName = 'normal_mp3'
            break
            case 5:
                bgmName = 'elite_mp3'
            break
            case 10:
                bgmName = 'extreme_mp3'
            break
            default:
            break
        }
        if(bgmName.length > 0){
            SoundManager.instance().play(bgmName);
        }
    }


}
