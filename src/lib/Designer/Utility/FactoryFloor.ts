import Konva from 'konva';

import FactoryBuilding from './FactoryBuilding'
import Selection from './Selection';
import type { KonvaEventObject } from 'konva/lib/Node';

class FactoryFloor {
    private readonly layer = new Konva.Layer();
    private readonly stage: Konva.Stage;
    private readonly selection: Selection;

    constructor(stage: Konva.Stage) {
        this.stage = stage;
        this.stage.on('click', (e) => this.onStageClick(e));

        this.stage.add(this.layer);
        this.layer.draw();

        this.selection = new Selection(this.stage, this.layer);
    }

    addBuilding(building: FactoryBuilding) {
        const shape = building.getShape();
        shape.on('click', (e) => this.onBuildingShapeClick(e));
        this.layer.add(shape);
    }

    private onStageClick(e:KonvaEventObject<MouseEvent>) {
        if (e.evt.button === 0 && !e.evt.ctrlKey && e.target === this.stage) {
            this.selection.clear();
        }
    }

    private onBuildingShapeClick(e: Konva.KonvaEventObject<MouseEvent>) {
        const shape = e.target as Konva.Shape;
        if (this.selection.selected(shape)) {
            if (e.evt.ctrlKey) {
                this.selection.unselect(shape);
            }

            return;
        }

        if (e.evt.ctrlKey === false) {
            this.selection.clear();
        }

        this.selection.select(shape);
    }
}

export default FactoryFloor;
