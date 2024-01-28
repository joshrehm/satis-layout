import Konva from 'konva';
import type FactoryBuilding from './FactoryBuilding';
import type { Vector2d } from 'konva/lib/types';

class Selection {
    private readonly group = new Konva.Group({ x: 0, y: 0, draggable: true });
    private readonly dragLayer = new Konva.Layer();

    private readonly stage: Konva.Stage;
    private readonly factoryLayer: Konva.Layer;

    constructor(stage: Konva.Stage, factoryLayer: Konva.Layer) {
        this.factoryLayer = factoryLayer;
        this.dragLayer.add(this.group);

        this.stage = stage;
        this.stage.add(this.dragLayer);
    }

    selected(shape: Konva.Shape) {
        return (shape.getParent() === this.group);
    }

    select(shape: Konva.Shape) {
        if (shape.getLayer() !== this.factoryLayer) {
            console.warn('Factory shape was not in expected layer!');
        }
        
        const shapePosition = shape.position();
        const groupPosition = this.group.position();

        const groupRelativePosition = {
            x: shapePosition.x - groupPosition.x,
            y: shapePosition.y - groupPosition.y
        };

        shape.moveTo(this.group);
        shape.position(groupRelativePosition);

        shape.stroke('#ff0000');
    }

    unselect(shape: Konva.Shape) {
        const shapePosition = shape.position();
        const groupPosition = this.group.position();

        const stageRelativePosition = {
            x: shapePosition.x + groupPosition.x,
            y: shapePosition.y + groupPosition.y
        };

        shape.moveTo(this.factoryLayer);
        shape.position(stageRelativePosition);

        shape.stroke('#ffa0a0');
    }

    clear() {
        while(this.group.children.length > 0) {
            const child = this.group.children[0] as Konva.Shape;
            this.unselect(child);

        }
    }
}

export default Selection;

