<script>
	import { SceneController } from "$lib/api/three/SceneController";
    import * as THREE from 'three';

    let {title} = $props()

    const addCube = () => {
        const cube = new THREE.BoxGeometry();
        const mesh = new THREE.Mesh(cube, new THREE.MeshPhongMaterial({
            color: 'green',
            transparent: true,
            opacity: 0.5,
        }));
        SceneController.getInstance().addObject(mesh);
    }
</script>
<div class="rounded-lg sidebar-base">
    <div class="p-2">
        {title}
    </div>
    <hr/>
    <div class="p-2">
        <button class="sidebar-element-btn" onclick={addCube}>Add Cube</button>
    </div>
</div>


<style>
    .sidebar-base {
        width: 320px;
        height: 80vh;
        border-width: 2px;
        background-color: white;
        border-color: black;
        position: absolute;
        z-index: 1;
        filter: drop-shadow(0px 0px 2px grey);
        margin-top: 20px;
        margin-left: 20px;
    }
    
    .sidebar-element-btn {
        border-width: 1px;
        border-radius: 4px;
        border-color: 'silver';
        background-color: rgb(197, 239, 255);
        padding: 2px;
        min-width: 48px;
        min-height: 32px;
        transition: 0.2s;
    }

    .sidebar-element-btn:hover {
        background-color: rgb(106, 189, 222);
        transition: 0.2s;
    }
</style>