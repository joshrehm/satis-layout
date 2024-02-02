<script lang="ts">
    import Konva from 'konva';
    import { onMount } from 'svelte';

    import DesignerGrid from './Utility/Grid';
    import FactoryFloor from './Utility/FactoryFloor';
    import FactoryBuilding from './Utility/FactoryBuilding';
    import Selection from './Utility/Selection';
    import type { Vector2d } from 'konva/lib/types';

    let container: HTMLDivElement;
    let stage : Konva.Stage;
    let grid : DesignerGrid;
    let selection: Selection;
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
        stage.on('click', onStageClick);

        grid = new DesignerGrid(stage);
        selection = new Selection(stage);
        floor = new FactoryFloor(stage);

        let x = 0, y = 0;
        for(let a = 0; a < 50; ++a) {
            x = 35 + (a % 10) * (35 * 4);
            y = 35 + Math.floor(a / 10) * (35 * 4);
            
            if ((a % 10) === 0)
                x = 35;

            addBuilding({ x, y });
        }
    });

    export function addBuilding(position?: Vector2d) {
        const building = new FactoryBuilding();
        if (position) {
            building.getShape().position(position);
        }
        floor.addBuilding(building);
        building.on('click', onBuildingClick);
        return building;
    }

    function onStageContextMenu(e: Konva.KonvaEventObject<MouseEvent>) {
        e.evt.preventDefault();
    }

    function onStageDragStart(e: Konva.KonvaEventObject<MouseEvent>) {
        if (!e.evt) {
            return;
        }

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

    function onStageClick(e: Konva.KonvaEventObject<MouseEvent>) {
        if (e.evt.button === 0 && !e.evt.ctrlKey && e.target === stage) {
            selection.clear();
        }
    }

    function onBuildingClick(e: Konva.KonvaEventObject<MouseEvent>) {
        const shape = e.target as Konva.Shape;
        if (selection.selected(shape)) {
            if (e.evt.ctrlKey) {
                selection.unselect(shape);
            }

            return;
        }

        if (e.evt.ctrlKey === false) {
            selection.clear();
        }

        selection.select(shape);

    }
</script>

<div bind:this={container} {...$$restProps}>
{#if stage}
    <slot />
{/if}
</div>
