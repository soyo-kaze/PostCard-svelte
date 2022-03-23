<script lang="ts">
  export let icons: { left: any; right: any };
  export let value: string | number;
  export let key: any;
  export let scales: { up: number; down: number };
  export let action: (key: any, scale: number) => void;
</script>

<main>
  <div class="button__wrap">
    <div class="button left" on:click={() => action(key, scales.down)}>
      {icons.left}
    </div>
    <div class="value">
      {scales.up < 1 && scales.down > -1 ? `x ${value}` : `${value}°deg`}
    </div>
    <div class="button right" on:click={() => action(key, scales.up)}>
      {icons.right}
    </div>
  </div>
</main>

<style>
  .button__wrap {
    display: flex;
    margin: 10px;
    color: white;
    justify-content: center;
    align-items: center;
  }
  .value {
    padding: 10px;
    background-color: rgb(48, 149, 48);
  }
  .button {
    padding: 10px;
    background-color: green;
    cursor: pointer;
  }
  .button:hover {
    background-color: rgb(1, 77, 1);
    transition-duration: 200ms;
  }
  .left {
    border-radius: 10px 0px 0px 10px;
  }
  .right {
    border-radius: 0px 10px 10px 0px;
  }
</style>
