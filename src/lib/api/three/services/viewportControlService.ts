import * as THREE from 'three';

export class ViewportControlService {
    resetCamera = () => {
        // Remove the eventListener temporarily/
        this.sceneController.controls.removeEventListener('change', this.updateCameraPlane);

        const boundingBox = new THREE.Box3();
        const camera = this.sceneController.getCamera() as THREE.OrthographicCamera;

        // Calculate bounding box for the scene
        boundingBox.setFromObject(this.sceneController.getScene());

        const min = boundingBox.min;
        const max = boundingBox.max;

        // Calculate the direction vector from min to max
        const directionMinToMax = max.clone().sub(min).normalize();

        // Calculate positions
        const cameraCenter = max.clone().add(directionMinToMax.clone().multiplyScalar(10));
        const cameraLookAt = min;
        
        console.log(cameraCenter);
        
        // Set camera's coordinates
        camera.position.set(cameraCenter.x, cameraCenter.y, cameraCenter.z);
        camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);

        camera.near = 0.1;
        camera.far = cameraCenter.distanceTo(cameraLookAt)+2000;
        camera.updateProjectionMatrix();

        // Apply change
        this.sceneController.setCamera(camera);
        this.sceneController.render();

        console.log(camera.position);

        // Restore the eventListener
        this.sceneController.controls.addEventListener('change', this.updateCameraPlane);
    }

    updateCameraPlane = () => {
        const boundingBox = new THREE.Box3();

         // Calculate bounding box for the scene
        boundingBox.setFromObject(this.sceneController.getScene());

        const min = boundingBox.min;
        const max = boundingBox.max;

        // Calculate the direction vector from min to max
        const directionMinToMax = max.clone().sub(min).normalize();

        // Load scene, camera, renderer
        const scene = this.sceneController.getScene();
        const camera = this.sceneController.getCamera() as THREE.OrthographicCamera;
        const renderer = this.sceneController.getRenderer();
        
        const cameraCenter = camera.position.clone(); // Keep the current camera position
        const cameraLookAt = max.clone().sub(directionMinToMax.clone().multiplyScalar(10));

        console.log(cameraCenter);

        camera.near = 0.1;
        camera.far = cameraCenter.distanceTo(cameraLookAt)+2000;
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
        this.sceneController.setCamera(camera);
        console.log(camera.position);
    }
}