<script lang="ts">
    import Konva from 'konva';
    export let stage: Konva.Stage;

    const GridSize = 25;
    const GridOverdrawPercentage = 0.2;
    const ZoomFactor = 0.9;
    
    // Template line from which grid lines are created.
    const lineTemplate = new Konva.Line({
        points: [ ],
        stroke: '#888',
        listening: false
    });

    // TODO: Figure out the right type for e
    function updateZoom(layer: Konva.Layer, e: any) {
        e.evt.preventDefault();

        if (e.evt.deltaY > 0) {
            if (stage.scaleX() < 0.5) {
                return;
            }
            adjustZoomBy(layer, ZoomFactor);
        }
        else {
            if (stage.scaleX() > 2) {
                return;
            }
            adjustZoomBy(layer, 2 - ZoomFactor);
        }
    }

    function adjustZoomBy(layer: Konva.Layer, factor: number) {
        const previousScale = stage.scaleX();

        const pointerPosition = stage.getPointerPosition();
        if (!pointerPosition) {
            return;
        }

        const targetScale = previousScale * factor;
        const cursorLocation = {
            x: (pointerPosition.x - stage.x()) / previousScale,
            y: (pointerPosition.y - stage.y()) / previousScale
        };
        const targetLocation = {
            x: pointerPosition.x - cursorLocation.x * targetScale,
            y: pointerPosition.y - cursorLocation.y * targetScale
        };

        stage.scale({ x: targetScale, y: targetScale });
        stage.position(targetLocation);

        updateGrid(layer);

        // Uncomment this if shapes don't move when zooming
        stage.batchDraw();
    }

    function updateGrid(layer: Konva.Layer) {
        // Reset the layer
        layer.destroyChildren();

        const transform = stage.getAbsoluteTransform().copy().invert();
        const position = transform.point({ x: 0, y: 0 });

        // These are used to undo the scaling in the canvas so that we can calculate our start/end x and y positions.
        // If we don't do this, the lines will expand/shrink as we zoom in/out.
        const scaleX = Math.pow(stage.scaleX(), -1);
        const scaleY = Math.pow(stage.scaleY(), -1);

        const startX = Math.floor((position.x - (stage.width() * GridOverdrawPercentage * scaleX)) / GridSize) * GridSize;
        const stopX = Math.floor((position.x + (stage.width() * (1 + GridOverdrawPercentage) * scaleX)) / GridSize) * GridSize;

        const startY = Math.floor((position.y - (stage.height() * GridOverdrawPercentage * scaleY)) / GridSize) * GridSize;
        const stopY = Math.floor((position.y + (stage.height() * (1 + GridOverdrawPercentage) * scaleY)) / GridSize) * GridSize;

        layer.add(new Konva.Rect({
            x: startX,
            y: startY,
            width: stopX - startX,
            height: stopY - startY,
            fill: '#336699'
        }));

        for(let x = startX; x < stopX; x += GridSize) {
            let line = lineTemplate.clone({
                points: [ x, startY, x, stopY ],
                strokeWidth: Math.abs(x / GridSize) % 8 === 0 ? 2 : 0.5
            });

            line.perfectDrawEnabled(false);
            line.shadowForStrokeEnabled(false);
            line.transformsEnabled('position');

            layer.add(line);
        }

        for(let y = startY; y < stopY; y += GridSize) {
            let line = lineTemplate.clone({
                points: [ startX, y, stopX, y ],
                strokeWidth: Math.abs(y / GridSize) % 8 === 0 ? 2 : 0.5
            });

            line.perfectDrawEnabled(false);
            line.shadowForStrokeEnabled(false);
            line.transformsEnabled('position');

            layer.add(line);
        }

        layer.batchDraw();
    }

    $: if (stage) {
        const grid = new Konva.Layer();
        stage.add(grid);

        stage.on('dragmove', () => updateGrid(grid));
        stage.on('wheel', (e) => updateZoom(grid, e));

        updateGrid(grid);
    }
</script>
