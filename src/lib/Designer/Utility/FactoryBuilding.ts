import Konva from 'konva';

class FactoryBuilding {
    readonly rect : Konva.Rect;

    private static buildingRect = new Konva.Rect({
        x: 0, y: 0, width: 100, height: 100,
        stroke: '#ffa0a0',
        fill: '#707070',
        hitStrokeWidth: 0,
        shadow: false,
        perfectDrawEnabled: false,
        shadowForStrokeEnabled: false
    });

    constructor() {
        this.rect = FactoryBuilding.buildingRect.clone();
        this.rect.setAttr('data-building', this);
    }

    getShape() {
        return this.rect;
    }
}

export default FactoryBuilding;
