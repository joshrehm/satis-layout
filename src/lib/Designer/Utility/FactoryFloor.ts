import Konva from 'konva';

import FactoryBuilding from './FactoryBuilding'
import Selection from './Selection';
import type { KonvaEventObject } from 'konva/lib/Node';

class FactoryFloor {
    private readonly layer = new Konva.Layer();
    private readonly stage: Konva.Stage;

    constructor(stage: Konva.Stage) {
        this.stage = stage;

        this.stage.add(this.layer);
        this.layer.draw();
    }

    addBuilding(building: FactoryBuilding) {
        const shape = building.getShape();
        this.layer.add(shape);
    }
}

export default FactoryFloor;
