<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment"; // 클라이언트 여부 확인
    import { SceneController } from "$lib/api/three/SceneController";

    let canvas: HTMLCanvasElement;
    let canvasWidth = 0;
    let canvasHeight = 0;

    if (browser) {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
    }

    onMount(() => {
        if (canvas) {
            const renderer = SceneController.CreateRenderer(canvas);
            const rendererConfig = SceneController.InitiateRenderer(renderer);
            SceneController.setInstance(rendererConfig);
        }

        if (browser) {
            // Viewport Resizer
            const handleResize = () => {
                canvasWidth = window.innerWidth;
                canvasHeight = window.innerHeight;
                if (canvas) {
                    canvas.width = canvasWidth;
                    canvas.height = canvasHeight;
                    SceneController.getInstance().resize(canvasWidth, canvasHeight);
                }
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    });
</script>

<!-- svelte-ignore element_invalid_self_closing_tag -->
<canvas bind:this={canvas} width={canvasWidth} height={canvasHeight} />
