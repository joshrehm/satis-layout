<script lang="ts">
    import { onMount } from "svelte";
    
    import Designer from "$lib/Designer/Designer.svelte";
    
    export let designer : Designer;

    onMount(() => {
        //designer.addBuilding();
    });

    function addBuilding() {
        designer.addBuilding();
    }
</script>

<div id="toolbar">
    <button on:click={addBuilding}>Building</button>
</div>

<style>
    #toolbar {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 120px;
        height: 400px;
        border: 1px solid black;
        background-color: grey;
        z-index: 100;
    }
</style>