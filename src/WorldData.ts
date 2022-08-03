class WorldData {
	public static GAME_TIME_MINUTES:number = 5
	/**敌机拾取宝箱判定 */
	public static ENEMY_DRIFT:boolean = true
	/**撞机判定 */
	public static PLANE_CRASH:boolean = false
	public static PLANE_WIDTH:number = 20
	public static PLANE_HEIGHT:number = 35
	//test
	// public static PLANE_WIDTH:number = 4
	// public static PLANE_HEIGHT:number = 7

	public static MAP_SIZE:number = 8000;

	/**检测帧间隔 */
	public static CHECK_INTERVAL:number = 2

	public static SPEED:any = {
		PlayerPlane: [6, 12, 18],
		// PlayerPlane: [2, 3, 5],
		EnemyPlane: [4,8,14],
		EliteEnemyPlane: [6, 12, 18],
		ExtremeEnemyPlane: [2, 16, 26],
	}
}