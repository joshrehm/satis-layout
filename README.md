# Satisfactory Factory Layout Planner

This planner is for laying out factories. You can position factory buildings,
belts, mergers, and splitters.

## TODO

Required functionality:

 * [X] Foundation grid
 * [X] Panning/zooming
 * [ ] Snap-to-grid
 * [ ] Belts/Pipes
 * [ ] Building info (size, image, connection points)
 * [ ] Labels
 * [ ] Copy/Paste
 * [ ] Export/Import
 * [X] Multi-select
 * [ ] Drag to select

Nice to have (In no particular order):

 * [ ] Blueprints
 * [ ] Floors
 * [ ] Power Lines/Poles
 * [ ] Recipe selection
 * [ ] Display Input/Output Rates (+Overclocking)
 * [ ] Power calculation


# Controls

 * Pan with the right mouse button
 * Zoom with the mouse wheel
 * Buildings can be selected with left click. Multiple buildings can be selected
   by holding CTRL. To deselect buildings, click a blank area on the grid.
 

## Known Issues

 * Responsiveness can be laggy in Firefox. Edge and Chrome do not exhibit this behavior.
   However, I could not find any related bug reports for Firefox. See:<br/>
   https://github.com/konvajs/konva/issues/801<br/>
   https://github.com/konvajs/konva/issues/293<br/>


## Development

This project is implemented with svelte kit. To get the project running, 
clone the repo and install dependencies with `npm install`.

To start a development server:

```bash
npm run dev
```


## Build

To create a production build:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) 
> for your target environment.
