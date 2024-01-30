<script lang="ts">
    import Designer from "$lib/Designer/Designer.svelte";
    import Toolbar from "$lib/Gui/Toolbar.svelte";

    let designer : Designer;

</script>

<div id="gui">
    <header>
        <h1>Designer</h1>
    </header>
    <Designer bind:this={designer} class="designer">
    {#if designer}
        <Toolbar designer={designer} />
    {/if}
    </Designer>
    <footer>
        &copy; 2024 Joshua Rehm
    </footer>
</div>

<style>
    :global(.designer) {
        flex: 1;
        position: relative;

        border: 1px solid black;
        margin: 0px 16px 0px 16px;
    }

    #gui {
        display: flex;
        flex-direction:column;
        height: 100%;
    }
</style>
