<script lang="ts">
  import { fly } from "svelte/transition";
  import { handleCard } from "./PosterPanel";
  import { handleEdit, handleMove, mouseMove } from "./TextMove";
  import { imgSrcStore, postCardStore } from "../../store";
  import { handleDownload } from "./ImageGen";

  let imgSrc = $imgSrcStore;
  let postCards = $postCardStore;
  let grapHidden = true;

  $: {
    imgSrc = $imgSrcStore;
  }
  $: {
    postCards = $postCardStore;
  }
</script>

<main class="container__poster">
  {#key imgSrc.key}
    <div
      class="post__card"
      in:fly={{ x: -200, delay: 300 }}
      out:fly={{ x: 200, duration: 300 }}
    >
      <div
        id="card__image"
        data-testid="post__card"
        style={`rotate:${imgSrc.rotate}deg;scale:${imgSrc.scale};transition-duration:300ms`}
      >
        <div
          class="post__text"
          data-testid="text"
          hidden={imgSrc.text === undefined ? true : imgSrc.text.hidden}
          style={`top:${
            imgSrc.text === undefined ? "" : imgSrc.text.Y
          }px;left:${imgSrc.text === undefined ? "" : imgSrc.text.X}px`}
          on:mouseover={() => (grapHidden = false)}
          on:focus={() => (grapHidden = false)}
          on:mouseleave={() => (grapHidden = true)}
        >
          <div
            style="width: 10px;height:10px;background-color:black;cursor:grab"
            hidden={grapHidden}
            on:mousedown={handleMove}
            on:mouseup={() =>
              document
                .querySelector(".post__card")
                .removeEventListener("mousemove", mouseMove)}
          />
          <div on:input={handleEdit} contenteditable="true">
            {imgSrc.text === undefined ? "" : imgSrc.text.data}
          </div>
        </div>
        <img src={imgSrc.imgSrc} alt="PostCard" />
      </div>
    </div>
  {/key}
  <div class="add__cards">
    <!--
      Cards switching section 
    -->
    {#each postCards as card}
      <img
        src={card.imgSrc}
        alt="SmallCards"
        class="small__card"
        class:active={card.active}
        on:click={(e) => handleCard(e, card)}
      />
    {/each}
  </div>
  <!--Download Button-->
  <!-- svelte-ignore a11y-missing-content -->
  <a id="download" download="template.jpg" />
  <button class="btn" on:click={handleDownload}>Download</button>
</main>

<style>
  .container__poster {
    border-radius: 30px;
    display: flex;
    justify-content: end;
    flex-direction: column;
    align-items: center;
    margin: 0px 20px 0px 20px;
    height: 100%;
    width: 100%;
    background-color: rgba(135, 247, 210, 0.694);
    padding: 20px;
    transition-duration: 300ms;
  }
  .post__card {
    margin: 10px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .post__card > div > img {
    object-fit: contain;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
    overflow: hidden;
  }
  .add__cards {
    padding: 20px 0px 10px 0px;
    /* border-top: 1px solid; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .small__card {
    object-fit: contain;
    border-radius: 10px;
    transition-duration: 300ms;
    width: 100%;
    margin-left: 10px;
    opacity: 0.5;
    max-width: 100px;
  }
  .active {
    opacity: 1;
    max-width: 120px;
  }
  .post__text {
    padding: 10px 10px 0px 10px;
    width: fit-content;
    position: relative;
    max-width: 600px;
    z-index: 20;
    color: white;
    border-radius: 10px;
  }
  .post__text:hover {
    transition-duration: 300ms;
    border: 1px solid gray;
    background-color: white;
    color: black;
  }
  #card__image {
    height: fit-content;
    width: fit-content;
  }
  @media screen and (max-width: 750px) {
    .container__poster {
      margin-bottom: 20px;
      padding: 10px 0px 10px 0px;
    }
  }
</style>
