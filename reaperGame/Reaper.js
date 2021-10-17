import { Vector3 } from '../../libs/three128/three.module.js';
import { GLTFLoader } from '../../libs/three128/GLTFLoader.js';

class Reaper{
    constructor(game){
        this.assetsPath = game.assetsPath;
        this.loadingBar = game.loadingBar;
        this.game = game;
        this.scene = game.scene;
        this.load();
        this.tmpPos = new Vector3();
    }

    get position(){
        if (this.reaper!==undefined) this.reaper.getWorldPosition(this.tmpPos);
        return this.tmpPos;
    }

    set visible(mode){
        this.reaper.visible = mode;
    }

    load(){
    	const loader = new GLTFLoader( ).setPath(`${this.assetsPath}reaper/`);
        this.ready = false;
        
		// Load a glTF resource
		loader.load(
			// resource URL
			'reaper.glb',
			// called when the resource is loaded
			gltf => {

				this.scene.add( gltf.scene );
                this.reaper = gltf.scene;
                this.velocity = new Vector3(0,0,0.1);
                
                this.scythe = this.reaper.getObjectByName("scythe");

                this.ready = true;
    
			},
			// called while loading is progressing
			xhr => {

				this.loadingBar.update('reaper', xhr.loaded, xhr.total );
				
			},
			// called when loading has errors
			err => {

				console.error( err );

			}
		);
	}	

    reset(){
        this.reaper.position.set(0, 0, 0);
        this.reaper.visible = true;
        this.velocity.set(0,0,0.1);
    }

    update(time){
        if (this.scythe != undefined) this.scythe.rotateX(Math.sin(time*3)*0.012); // this.scythe.rotation.set(0,0, Math.sin(time*3)*0.2, 'XYZ'); // //this.scythe.rotateZ(1);

        if (this.game.active){
            if (!this.game.spaceKey){
                this.velocity.y -= 0.001;
            }else{
                this.velocity.y += 0.001;
            }
            this.velocity.z += 0.0001;
            this.reaper.translateZ( this.velocity.z );
            this.reaper.translateY( this.velocity.y );
        }else{
            this.reaper.position.y = Math.cos(time) *0.5;
        }

    }
}

export { Reaper };