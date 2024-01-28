import Konva from 'konva';
import Designer from '../Designer.svelte';

class DesignerGrid {
    static readonly ZoomFactor = 0.95;
    static readonly OverDraw   = 0.20;
    static readonly GridSize   = 35;

    private readonly stage : Konva.Stage;

    private readonly gridLayer = new Konva.Layer({ listening: false });
    private readonly gridLine = new Konva.Line({
        points: [],
        stroke: '#888',
        listening: false,
        hitStrokeWidth: 0,
        perfectDrawEnabled: false,
        shadowForStrokeEnabled: false
    });

    constructor(stage: Konva.Stage) {
        this.stage = stage;

        this.stage.on('dragmove', () => this.onStageDragMove());
        this.stage.on('wheel',    (e) => this.onStageWheel(e));
        this.stage.add(this.gridLayer);

        this.gridLayer.hitGraphEnabled(false);

        this.render();
    }

    public render() {
        // Get our stage transform and translate the current offset from 0, 0
        const transform = this.stage.getAbsoluteTransform().copy().invert();
        const position = transform.point({ x: 0, y: 0 });

        // Calculate the inverse scale to undo scaling of current coordinates.
        // This is necessary to ensure the grid lines render correctly.
        const scaleX = Math.pow(this.stage.scaleX(), -1);
        const scaleY = Math.pow(this.stage.scaleY(), -1);

        // Calculate our start and stop X and Y taking into consideration the
        // inverse scale, over draw, and grid size
        const Xbegin = Math.floor((position.x - (this.stage.width() * DesignerGrid.OverDraw * scaleX)) / DesignerGrid.GridSize) * DesignerGrid.GridSize;
        const Ybegin = Math.floor((position.y - (this.stage.height() * DesignerGrid.OverDraw * scaleY)) / DesignerGrid.GridSize) * DesignerGrid.GridSize;
        const Xend   = Math.floor((position.x + (this.stage.width() * (1 + DesignerGrid.OverDraw) * scaleX)) / DesignerGrid.GridSize) * DesignerGrid.GridSize;
        const Yend   = Math.floor((position.y + (this.stage.height() * (1 + DesignerGrid.OverDraw) * scaleY)) / DesignerGrid.GridSize) * DesignerGrid.GridSize;

        // Wipe our layer to redo everything
        this.gridLayer.destroyChildren();

        // Start with the background
        this.gridLayer.add(new Konva.Rect({
            x: Xbegin,
            y: Ybegin,
            width: Xend - Xbegin,
            height: Yend - Ybegin,
            fill: '#336699'
        }));

        // Vertical grid lines
        for(let x = Xbegin; x < Xend; x += DesignerGrid.GridSize) {
            const thickness = Math.abs(x / DesignerGrid.GridSize) % 8 === 0 ? 2 : 0.5;

            this.gridLayer.add(this.gridLine.clone({
                points: [ x, Ybegin, x, Yend ],
                strokeWidth: thickness
            }));
        }

        // Horizontal grid lines
        for(let y = Ybegin; y < Yend; y += DesignerGrid.GridSize) {
            const thickness = Math.abs(y / DesignerGrid.GridSize) % 8 === 0 ? 2 : 0.5;

            this.gridLayer.add(this.gridLine.clone({
                points: [ Xbegin, y, Xend, y ],
                strokeWidth: thickness
            }));
        }

        this.gridLayer.batchDraw();
    }

    private onStageDragMove() {
        this.render();
    }

    private onStageWheel(e: Konva.KonvaEventObject<WheelEvent>) {
        // Don't scroll the window
        e.evt.preventDefault();

        if (e.evt.deltaY < 0) {
            // Zoom in
            this.updateZoom(2 - DesignerGrid.ZoomFactor);
        }
        else {
            // Zoom out
            this.updateZoom(DesignerGrid.ZoomFactor);
        }
    }

    private updateZoom(factor: number) {
        const scale = this.stage.scaleX();
        const pointer = this.stage.getPointerPosition();
        if (!pointer) {
            return;
        }

        const newScale = scale * factor;

        // `pointer` is our position on the screen. This is our
        // position in the canvas.
        const pointerOffset = {
            x: (pointer.x - this.stage.x()) / scale,
            y: (pointer.y - this.stage.y()) / scale
        };

        // This where we want to move the canvas to. This gives the
        // perception that we're zooming into the pointer location
        const pointerTarget = {
            x: pointer.x - pointerOffset.x * newScale,
            y: pointer.y - pointerOffset.y * newScale
        };

        this.stage.scale({ x: newScale, y: newScale });
        this.stage.position(pointerTarget);

        this.render();
    }
}

export default DesignerGrid;
