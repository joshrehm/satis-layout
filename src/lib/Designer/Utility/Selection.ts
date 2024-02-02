import Konva from 'konva';
import SelectionShape from './SelectionShape';

class Selection {
    private readonly dragLayer = new Konva.Layer();
    private readonly group = new SelectionShape();
    private readonly stage: Konva.Stage;

    constructor(stage: Konva.Stage) {
        this.stage = stage;
        
        this.dragLayer.add(this.group);
        this.stage.add(this.dragLayer);
    }

    on(name: string, listener: Konva.KonvaEventListener<Konva.Group, any>) {
        this.group.on(name, listener);
    }

    selected(shape: Konva.Shape) {
        return (this.group.shapes().indexOf(shape) >= 0)
    }

    select(shape: Konva.Shape) {
        this.group.shapes(
            this.group.shapes().concat(shape));
    }

    unselect(shape: Konva.Shape) {
        const nodes = this.group.shapes().slice();
        nodes.splice(nodes.indexOf(shape), 1);
        this.group.shapes(nodes);
    }

    clear() {
        this.group.shapes([]);
    }
}

export default Selection;
