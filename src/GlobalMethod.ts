class GlobalMethod{
    public static random(min:number, max:number):number{
        return Math.random()*(max - min) + min
    }

    /**
	 * 获取一个mc帧动画
	 * @param {stirng} name mc帧动画的文件名
	 * @param {number} playNum 帧动画播放次数 -1为循环播放 默认循环播放
	 */
	public static getMc(name: string, playNum: number = -1): egret.MovieClip {
		let data = RES.getRes(`${name}_json`);
		let txtr = RES.getRes(`${name}_png`);
		let mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData());
		// mc.play(playNum);
		return mc;
	}

    public static loadImage(url:string, listner:any, successFunc:Function, failFunc:Function){		
		let loader = new egret.ImageLoader();
		loader.crossOrigin = "anonymous";// 跨域请求
		loader.load(url)
		loader.once(egret.Event.COMPLETE, successFunc, listner)
		loader.once( egret.IOErrorEvent.IO_ERROR, failFunc, listner);	
	}

    public static httpReq(url:string, param:any, method:'GET'|'POST', listner:any, successFunc:Function, failFunc:Function, contentType:'application/json'|'application/x-www-form-urlencoded' ,token?:string){							
        if(method == 'GET'){
            url = url+'?'+param;
        }
		let req = new egret.HttpRequest();	
		req.open(url, method);	
		req.setRequestHeader("Accept", "*/*");
        if(token) req.setRequestHeader("Authorization", token);
		req.setRequestHeader("Content-Type", contentType);
        if(method == 'GET'){
            req.send();
        }else{
            req.send(param);
        }		
		req.addEventListener(egret.Event.COMPLETE, successFunc,listner);
		if(failFunc!=null){
			req.addEventListener(egret.IOErrorEvent.IO_ERROR, failFunc,listner);
			req.addEventListener(egret.HTTPStatusEvent.CLOSE, failFunc,listner);
		}		
	}	

	public static Loaded(){
        window.parent.postMessage({
            "isLoadComplete": true,
            "url": window.location.href
        }, '*');
	}

}