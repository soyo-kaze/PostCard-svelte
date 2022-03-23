<script lang="ts">
  import { fly } from "svelte/transition";
  import { handleCard, handleUpload } from "./PosterPanel";
  import { imgSrcStore, postCardStore } from "../../store";

  let imgSrc = $imgSrcStore;
  let postCards = $postCardStore;

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
      in:fly={{ y: -200, delay: 300 }}
      out:fly={{ y: 200, duration: 300 }}
    >
      <div
        style={`rotate:${imgSrc.rotate}deg;scale:${imgSrc.scale};transition-duration:300ms`}
      >
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
</main>

<style>
  .container__poster {
    border-radius: 30px;
    display: flex;
    justify-content: center;
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
  @media screen and (max-width: 750px) {
    .container__poster {
      margin-bottom: 20px;
      padding: 10px 0px 10px 0px;
    }
  }
</style>
