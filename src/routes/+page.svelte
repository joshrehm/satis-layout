<script lang="ts">
    import RenderSurface from '$lib/RenderSurface.svelte';
    import Grid from '$lib/Grid.svelte';
    import type Konva from 'konva';

    let stage: Konva.Stage | null = null;
    function handleStageReady(s: Konva.Stage) {
        stage = s;
    }
</script>

<RenderSurface onStageReady={handleStageReady} />
{#if stage}
    <Grid {stage} />
{/if}
