<script lang="ts">
  import { imgSrcStore } from "../../store";

  import { handleUpload } from "../PosterPanel/PosterPanel";
  import ActionButton from "./ActionButton.svelte";
  import { rotatePoster, scalePoster } from "./Actions";

  /**
   * This function is to invoke `input[type=file]` tag since it's hidden behind the
   * label tag for styling purpose.
   * @summary Click and invoke input[type=file] tag.
   */

  const handleClick = (): void => {
    (<HTMLInputElement>document.querySelector("input[type=file]")).click();
  };
</script>

<main class="container__action">
  <!--
      Upload image section
  -->
  <div class="button">
    <label class="btn" for="upload" on:click={handleClick}>Upload</label>
    <input type="file" required accept="image/*" on:change={handleUpload} />
  </div>

  <!--
    Scaling button
  -->
  <ActionButton
    value={$imgSrcStore.scale}
    icons={{ left: "➖", right: "➕" }}
    scales={{ up: 0.25, down: -0.25 }}
    action={scalePoster}
    key={$imgSrcStore.key}
  />

  <!--
    Rotation button
  -->
  <ActionButton
    value={$imgSrcStore.rotate}
    icons={{ left: "⬅️", right: "➡️" }}
    scales={{ up: 90, down: -90 }}
    action={rotatePoster}
    key={$imgSrcStore.key}
  />
</main>

<style>
  .container__action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    max-width: 20%;
    width: 100%;
    background-color: rgba(135, 247, 210, 0.694);
    border-radius: 10px;
  }
  .btn {
    background-color: #4dac30;
    border-radius: 10px;
    color: #ffffff;
    text-align: center;
    font-size: 15px;
    padding: 8px;
    width: fit-content;
    transition: all 0.5s;
    cursor: pointer;
  }
  input[type="file"] {
    position: absolute;
    z-index: -1;
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    margin: 15px;
  }
  @media screen and (max-width: 750px) {
    .container__action {
      max-width: 100%;
      justify-content: start;
      height: 20%;
      flex-direction: row;
    }
  }
</style>
