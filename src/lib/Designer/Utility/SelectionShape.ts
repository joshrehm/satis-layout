import Konva from 'konva';
import { Factory } from 'konva/lib/Factory';
import { getNumberValidator } from 'konva/lib/Validators';
import type { GetSet } from 'konva/lib/types';


export interface SelectionShapeConfig extends Konva.ContainerConfig {
    anchorFill?: string;
    anchorStroke?: string;
    anchorStrokeWidth?: number;
    anchorSize?: number;
    borderStroke?: string;
    borderStrokeWidth?: number;
    borderDash?: Array<number>;
    fill?: string,
    opacity?: number,
    padding?: number;
    selectionStroke?: string;
    selectionStrokeWidth?: number;
    snap?: number;
}

const ANCHORS = [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right'
];

class SelectionShape extends Konva.Group {
    declare anchorFill: GetSet<string, this>;
    declare anchorStroke: GetSet<string, this>;
    declare anchorStrokeWidth: GetSet<number, this>;
    declare anchorSize: GetSet<number, this>;
    declare borderStroke: GetSet<string, this>;
    declare borderStrokeWidth: GetSet<number, this>;
    declare borderDash: GetSet<number[], this>;
    declare fill: GetSet<string, this>;
    declare padding: GetSet<number, this>;
    declare shapes: GetSet<Konva.Shape[], this>;
    declare snap: GetSet<number, this>;
    declare selectedStroke: GetSet<string, this>;
    declare selectedStrokeWidth: GetSet<number, this>;

    private _shapes: Konva.Shape[] | null = null;
    private _box: Konva.Rect;

    constructor(config?: SelectionShapeConfig) {
        super(config);

        // Default opacity
        if (config && !config.opacity) {
            this.opacity(0.75);
        }

        this.initialize();
    }

    private initialize() {
        this.createBox();

        ANCHORS.forEach(name => {
            this.createAnchor(name);
        });
    }

    private createBox() {
        this._box = new Konva.Rect({
            stroke: this.borderStroke(),
            strokeWidth: this.borderStrokeWidth(),
            dash: [ 6, 3 ],
            fill: this.fill(),
            opacity: this.opacity()
        });
        this.add(this._box);
    }

    private createAnchor(name: string) {
        const anchor = new Konva.Rect({
            fill: this.anchorFill(),
            stroke: this.anchorStroke(),
            strokeWidth: this.anchorStrokeWidth(),
            name: name + '_anchor',
            draggable: true
        });

        anchor.on('dragstart', (e) => {
            anchor.stopDrag();
            e.cancelBubble = true; 
        });

        anchor.on('dragend', (e) => { 
            e.cancelBubble = true; 
        });

        this.add(anchor);
    }

    clearShapes() {
        if (!this._shapes) {
            return;
        }

        this._shapes.forEach(shape => {
            shape.stroke(shape.getAttr('selectedOriginalStroke'));
            delete shape.attrs.selectedOriginalStroke;

            shape.strokeWidth(shape.getAttr('selectedOriginalStrokeWidth'));
            delete shape.attrs.selectedOriginalStrokeWidth;
        });

        this._box.visible(false);
        this._shapes = [];
    }

    private getShapes() {
        return this._shapes || [];
    }

    private setShapes(shapes: Konva.Shape[]) {
        if (this._shapes && this._shapes.length > 0) {
            this.clearShapes();
        }
        
        this._shapes = shapes;
        if (this._shapes.length === 0) {
            return;
        }
        
        let minX = shapes[0].x(),
            maxX = shapes[0].x() + shapes[0].width(),
            minY = shapes[0].y(),
            maxY = shapes[0].y() + shapes[0].height();

        shapes.forEach(shape => {
            shape.setAttr('selectedOriginalStroke', shape.stroke());
            shape.setAttr('selectedOriginalStrokeWidth', shape.strokeWidth());

            shape.stroke(this.selectedStroke());
            shape.strokeWidth(this.selectedStrokeWidth());

            minX = Math.min(minX, shape.x());
            minY = Math.min(minY, shape.y());
            maxX = Math.max(maxX, shape.x() + shape.width());
            maxY = Math.max(maxY, shape.y() + shape.height());
        });

        this._box.position({ 
            x: minX - this.padding(),
            y: minY - this.padding()
        });
        this._box.size({ 
            width: (maxX - minX) + this.padding() * 2,
            height: (maxY - minY) + this.padding() * 2
        });

        this._box.moveToBottom();
        this._box.visible(true);
    }
}

Factory.addGetterSetter(SelectionShape, 'anchorFill', 'white');
Factory.addGetterSetter(SelectionShape, 'anchorStroke', 'rgb(0, 161, 255)');
Factory.addGetterSetter(SelectionShape, 'anchorStrokeWidth', 1, getNumberValidator());
Factory.addGetterSetter(SelectionShape, 'anchorSize', 10, getNumberValidator());
Factory.addGetterSetter(SelectionShape, 'borderStroke');
Factory.addGetterSetter(SelectionShape, 'borderStrokeWidth', 1, getNumberValidator());
Factory.addGetterSetter(SelectionShape, 'borderDash');
Factory.addGetterSetter(SelectionShape, 'fill', 'rgb(135, 206, 250)');
Factory.addGetterSetter(SelectionShape, 'padding', 8, getNumberValidator());
Factory.addGetterSetter(SelectionShape, 'selectedStroke', 'rgb(255, 215, 0)');
Factory.addGetterSetter(SelectionShape, 'selectedStrokeWidth', 2, getNumberValidator());
Factory.addGetterSetter(SelectionShape, 'shapes');
Factory.addGetterSetter(SelectionShape, 'snap', 1, getNumberValidator());

export default SelectionShape;
