// TypeScript file
class LifecycleCallback{
    private static map:{[key:string]:LcyObj}= {};

    public static regist(){
        egret.lifecycle.onPause = this.onPause;
        egret.lifecycle.onResume = this.onResume;
    } 

    public static addFunc(key:string, f1:()=>any, f2:()=>any){
        LifecycleCallback.map[key] = new LcyObj(f1,f2);
    }

    public static removeFunc(key:string){
        delete LifecycleCallback.map[key]
    }

    private static onPause(){       
        for(let i in LifecycleCallback.map){
            LifecycleCallback.map[i].onPause();
        }
    }

    private static onResume(){       
        for(let i in LifecycleCallback.map){
            LifecycleCallback.map[i].onResume();
        }
    }
}

class LcyObj{
    public onPause:()=>any;
    public onResume:()=>any;
    constructor(f1:()=>any, f2:()=>any){
        this.onPause = f1;
        this.onResume = f2
    }
}