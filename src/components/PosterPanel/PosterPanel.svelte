<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { handleCard, handleUpload } from "./PosterPanel";
  import { imgProp, imgSrcStore, postCardStore } from "../../store";

  let imgSrc = $imgSrcStore;
  let postCards = $postCardStore;
  let grapHidden = true;

  function handleEdit(e: Event) {
    let { target } = e;
    imgSrcStore.update((value) => ({
      ...value,
      text: {
        ...value.text,
        text: (target as HTMLDivElement).innerText,
      },
      undoStack: value,
    }));
    // $imgSrcStore.text.data = (target as HTMLDivElement).innerText;
  }

  const mouseMove = (e: MouseEvent) => {
    $imgSrcStore.text.X = e.offsetX;
    $imgSrcStore.text.Y = e.offsetY;
  };

  function handleMove(e: Event) {
    document.body.addEventListener("mouseup", () =>
      document
        .querySelector(".post__card")
        .removeEventListener("mousemove", mouseMove)
    );
    document
      .querySelector(".post__card")
      .addEventListener("mousemove", mouseMove);
  }

  $: {
    imgSrc = $imgSrcStore;
    if (imgSrc.text) {
      postCardStore.update((e) =>
        e.map((element: imgProp) =>
          element.key === imgSrc.key
            ? {
                ...element,
                text: { ...imgSrc.text },
              }
            : element
        )
      );
    }
    console.log(imgSrc.undoStack);
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
        style={`rotate:${imgSrc.rotate}deg;scale:${imgSrc.scale};transition-duration:300ms`}
      >
        <div
          class="post__text"
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
  <!-- <a id="download" download="template.jpg" href={dataUrl}>
    <button disabled={dataUrl === "" ? true : false}>Download</button>
  </a> -->
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
    height: 400px;
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
    border: 1px solid gray;
    border-radius: 10px;
    background-color: white;
    position: relative;
    max-width: 600px;
    z-index: 20;
  }
  @media screen and (max-width: 750px) {
    .container__poster {
      margin-bottom: 20px;
      padding: 10px 0px 10px 0px;
    }
  }
</style>
