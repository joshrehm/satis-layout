<script lang="ts">
    import Konva from 'konva';
    import { onMount } from 'svelte';

    import DesignerGrid from './Utility/Grid';
    import FactoryFloor from './Utility/FactoryFloor';
    import FactoryBuilding from './Utility/FactoryBuilding';

    let container: HTMLDivElement;
    let stage : Konva.Stage;
    let grid : DesignerGrid;
    let floor : FactoryFloor;

    // TODO: Subscribe to selection on drag event (through FactoryFloor)

    Konva.pixelRatio = 1;
    Konva.dragButtons = [ 0, 2 ];

    onMount(() => {
        stage = new Konva.Stage({
            container: container!,
            width: container.clientWidth,
            height: container.clientHeight,
            draggable: true
        });

        // Disable the context menu in the canvas
        stage.on('contextmenu', onStageContextMenu);
        stage.on('dragstart', onStageDragStart);

        grid = new DesignerGrid(stage);
        floor = new FactoryFloor(stage);
    });

    export function addBuilding() {
        const building = new FactoryBuilding();
        floor.addBuilding(building);
        return building;
    }

    function onStageContextMenu(e: Konva.KonvaEventObject<MouseEvent>) {
        e.evt.preventDefault();
    }

    function onStageDragStart(e: Konva.KonvaEventObject<MouseEvent>) {
        // If we're trying to drag the stage with the left mouse button, cancel
        if (e.evt.buttons === 1 && e.target === stage) {
            e.target.stopDrag();
            return;
        }

        // We always drag the stage with the right mouse button
        if (e.evt.buttons === 2 && e.target !== stage) {
            e.target.stopDrag();
            stage.startDrag();
        }
    }
</script>

<div bind:this={container} {...$$restProps}>
{#if stage}
    <slot />
{/if}
</div>
