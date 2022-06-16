// TypeScript file
module CollisionUtils {
    //===================================================碰撞检测核心代码部分==================================================
    //实现比较简单，除去注释部分，其实只有二十几行代码
    //参数依次为： 碰撞点，碰撞多边形的坐标，碰撞多边形各个顶点坐标(多边形的局部坐标系内，传进来的顶点数组必须为凸多边形的顺时针序列顶点)
    export function checkPointCollideShape(p: egret.Point, shppos: egret.Point, szpt: Array<egret.Point>): boolean {
        var n: number = szpt.length;
        if (n < 3) return false;
        var i: number = 0;
        var clonept: Array<egret.Point> = [];
        for (i = 0; i < szpt.length; i++) {
            var vp = new egret.Point(szpt[i].x, szpt[i].y);
            clonept.push(vp);
        }
        //把图形的顶点坐标转换到所在坐标系（如果坐标系不同需另处理，这里只是简单实例）
        for (i = 0; i < clonept.length; i++) {
            clonept[i].x += shppos.x;
            clonept[i].y += shppos.y;
        }
        //主要原理为右手法则，逆时针向量积为正，顺时针为负
        //首先判断起点、第二点与P向量积，如果大于零，说明在外面
        if (this.vectorCrossPoint(clonept[0], p, clonept[1]) > 0) return false;
        //首先判断起点、倒数第二点与P向量积，如果小于零，说明在外面
        if (this.vectorCrossPoint(clonept[0], p, clonept[n - 1]) < 0) return false;
        //以上两个判断通过了，说明检查点在多边形起点相邻两边的开口方向
        //从第二点和倒数第二点开始收缩
        i = 2;
        var j: number = n - 1;
        var line: number = -1;
        //这里采用二分法逐渐缩小范围来判定点的位置
        while (i <= j) {
            //找到当前等待队列中的点的中点
            var mid: number = (i + j) >> 1;
            //如果点在起点与中点之间，则把终点设为中点的前一点，否则把起点设置为中点的下一点
            if (this.vectorCrossPoint(clonept[0], p, clonept[mid]) > 0) {
                line = mid;
                j = mid - 1;
            }
            else i = mid + 1;
        }
        if (line < 0) return false;
        //找到了紧挨着点的两个夹边，此时，如果在多边形内，则与夹边的积必然小于零
        return this.vectorCrossPoint(clonept[line - 1], p, clonept[line]) < 0;
    }
    export function vectorCrossPoint(p0: egret.Point, p1: egret.Point, p2: egret.Point): number {
        return (p1.x - p0.x) * (p2.y - p0.y) - (p2.x - p0.x) * (p1.y - p0.y);
    }
}