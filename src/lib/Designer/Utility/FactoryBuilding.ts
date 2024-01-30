import Konva from 'konva';

class FactoryBuilding {
    readonly rect : Konva.Rect;
    
    // TODO: Snap to grid distance (Are all buildings 1.0?)
    // TODO: Building type (Smelter, Constructor, Assembler, etc.)
    // TODO: Building size
    // TODO: Building Connection Points (Pipe and Belt)
    
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
