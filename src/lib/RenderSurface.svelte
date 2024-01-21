<script lang="ts">
    import { onMount } from 'svelte';
    import Konva from 'konva';

    export let onStageReady: (stage: Konva.Stage) => void;

    let container: HTMLDivElement;

    onMount(() => {
        const stage = new Konva.Stage({
            container: container,
            width: window.innerWidth,
            height: window.innerHeight,
            draggable: true
        });

        if (onStageReady) {
            onStageReady(stage);
        }
    })
</script>

<div bind:this={container}></div>
