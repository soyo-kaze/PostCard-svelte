<script lang="ts">
  import { imgProp, imgSrcStore, postCardStore } from "../../store";
  import { handleUpload } from "../PosterPanel/PosterPanel";
  import ActionButton from "./ActionButton.svelte";
  import {
    addText,
    redo,
    removeText,
    rotatePoster,
    scalePoster,
    undo,
  } from "./Actions";

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
    testId={{ left: "scale__down", right: "scale__up" }}
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
    testId={{ left: "rotate__left", right: "rotate__right" }}
  />
  <div
    class="btn"
    style="margin: 10px;"
    data-testid="add__text"
    on:click={addText}
  >
    Add Text
  </div>
  <div
    class="btn"
    style="margin: 10px;"
    data-testid="remove__text"
    on:click={removeText}
  >
    Remove Text
  </div>
  <button
    class="btn"
    on:click={undo}
    disabled={$imgSrcStore.undoStack === undefined ? true : false}
  >
    undo
  </button>
  <button
    class="btn"
    on:click={redo}
    disabled={$imgSrcStore.redoStack === undefined ? true : false}
  >
    redo
  </button>
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
  :global(.btn) {
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
  .btn:hover {
    transition-duration: 300ms;
    background-color: #3aaf16;
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
    margin: 10px;
  }
  .btn:disabled {
    background-color: #71ac5f;
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
