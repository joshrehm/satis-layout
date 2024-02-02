import Konva from 'konva';

class FactoryBuilding {
    readonly shape : Konva.Rect;
    
    // TODO: Snap to grid distance (Are all buildings 1.0?)
    // TODO: Building type (Smelter, Constructor, Assembler, etc.)
    // TODO: Building size
    // TODO: Building Connection Points (Pipe and Belt)
    
    private static buildingRect = new Konva.Rect({
        x: 0, y: 0, width: 35*3, height: 35*3,
        stroke: '#ffa0a0',
        fill: '#707070',
        hitStrokeWidth: 0,
        shadow: false,
        perfectDrawEnabled: false,
        shadowForStrokeEnabled: false
    });

    constructor() {
        this.shape = FactoryBuilding.buildingRect.clone();
        this.shape.setAttr('data-building', this);
    }

    getShape() {
        return this.shape;
    }

    on(name: string, handler: Konva.KonvaEventListener<Konva.Rect, any>) {
        this.shape.on(name, handler);
    }
}

export default FactoryBuilding;
