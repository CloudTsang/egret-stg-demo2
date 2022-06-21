class WorldData {
	public static GAME_TIME_MINUTES:number = 5
	/**敌机拾取宝箱判定 */
	public static ENEMY_DRIFT:boolean = true
	/**撞机判定 */
	public static PLANE_CRASH:boolean = false
	public static PLANE_WIDTH:number = 20
	public static PLANE_HEIGHT:number = 35

	public static MAP_SIZE:number = 10000

	public static SPEED:any = {
		PlayerPlane: [6, 12, 18],
		EnemyPlane: [4,8,14],
		EliteEnemyPlane: [6, 12, 18],
		ExtremeEnemyPlane: [2, 16, 26],
	}
}