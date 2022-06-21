# egret-stg-demo2
 egret制作的打飞机小游戏2

运行
```
egret startserver -a
```

一个飞机射击小游戏，和常见的卷轴射击小游戏不同，是在固定大小的地图中四处飞行搜索敌机并击落的玩法。

![pic](https://gitee.com/cloudtsang/egret-stg-demo2/raw/main/pic.png)


飞机、子弹的移动方式是通过旋转角度、速度计算出xy轴的改变量。
主要难点在于我想制作玩家飞机总在屏幕中央且方向朝上的画面，使用了改变xy/rotation/anchorOffset的方式修改舞台中各个显示对象的位置，于是花费了较多时间调试计算坐标的代码。
```
public setData(deg:number, spd:number){
    let data = this.data
    if(data.deg == deg && data.spd == spd){
        //运动状态无需重新计算
        return
    }
    if(data.deg != deg){
        const rad = deg * Math.PI / 180
        const sin = Math.sin(rad)
        const cos = Math.cos(rad)
        data = {
            ...data,
            deg, rad, sin, cos
        }
    }
    this._dx = spd * data.sin
    this._dy = spd * data.cos
}
...
const {dx, dy} = b.moveData.getDAxis()
b.x += dx
b.y += dy
```

敌机的行动规则是计算敌机的前进方向和与目标的连线方向间的夹角，以及距离来决定移动方向和射击时机。分为了检测间隔从大（只是计算目标的方位决定移动方向）到小（计算与目标的距离并调整旋转角度）的索敌-射击几个阶段，具体条件在AIConfig.ts的注释中有描述。

基本上做到了敌机会主动扭向玩家所在的方向并在前进到范围内会进行射击的效果。现有几个明显的问题：

现在的敌机行为设计容易变成敌机追着玩家撞上来的效果，于是我关闭的撞机判定。

敌机的射击阶段有限时，结束后会重置到索敌阶段。导致玩家仍在附近，敌机却停止攻击并远离的情况，这其实也符合我预期，因为我也并不想敌机永远追着玩家打，但实际游玩是看上去就是有点奇怪。

此外距离过远时原地打转之类的行为，我就不纠结~~摆~~了毕竟AI的奇行基本上什么游戏都有。

此外各等级敌机的速度设定不太理想，低了没挑战性，高了容易追不上/被超过，导致攻击打不中的情况，调整中。

```
/**计算敌机前进方向和目标方向的夹角 */
protected angleCalc(){
    const enemy = this.plane
    const tgt = this.positionData.tgt
    let enemyRotation:number = this.positionData.enemyRotation
    const k1 = Math.tan(enemyRotation*Math.PI/180)
    const k2 = (tgt.y - enemy.y)/(tgt.x - enemy.x)
    const tan = Math.abs((k1-k2)/(1+k1*k2))
    const atan = Math.atan(tan)*180/Math.PI
    let angle = 90-atan
    this.positionData = {
        ...this.positionData, angle
    }
}
```

此外还遇到个奇怪的问题

当把WorldData.ts中的地图尺寸调大到10000时（实际从5400开始就出现这个问题），
```
public static MAP_SIZE:number = 10000;
```

Radar.ts中不加这三行代码，雷达上的小点便显示不出来，并且把beginFill的alpha参数改为1也不会出现黑色方框。不知道是egret的什么显示机制
```
layer.graphics.beginFill(0x000000, 0)
layer.graphics.drawRect(0,0,layer.width,layer.height)
layer.graphics.endFill()
```

