<script lang="ts">
  /**
   * @todo Refactor the code using `svelte/stores` so that `ActionPanel` can do it's work.
   * @todo Also shift all the JS Functions to a different file for better modularity and clean code.
   */
  import { fly } from "svelte/transition";

  interface imgProp {
    imgSrc: string;
    rotate: `${number}deg`;
    scale: number;
    key?: string;
    opacity: string;
    maxWidth: string;
  }

  let imgSrc: imgProp = {
    imgSrc: "/assets/post.jpg",
    rotate: "90deg",
    scale: 0.55,
    opacity: "1",
    maxWidth: "120px",
  };

  let postCards: Array<imgProp> = [imgSrc];

  /**
   * It uses FileReader to read the file uploaded via file-type input tag and changes
   * the image file to base64 string so it can be used in img tag as a source.
   * @summary This Function is to upload and add image.
   * @param {Event} e - It takes in an eventObject.
   */

  const handleUpload = (e: Event): void => {
    // Typescript doesn't know about the type of this element so we assert it to the one we are confident about <HTMLInputElement>
    const image = document.querySelector(
      "input[type=file]"
    ) as HTMLInputElement;

    const file = image.files[0];

    if (file) {
      const reader = new FileReader();
      reader.addEventListener(
        "load",
        function () {
          // Convert image file to base64 string
          let imgBase64 = reader.result;
          let imgSrcInner = imgBase64 as string;

          // Add multiple images to postCards array
          postCards.push({
            imgSrc: imgSrcInner,
            rotate: "0deg",
            scale: 1,
            opacity: "0.5",
            maxWidth: "100px",
          });
          postCards = postCards; // For Reactivity of svelte
        },
        false
      );
      reader.readAsDataURL(file);
    }
  };

  /**
   * We can change image from the small carousel to postCard panel where actions can be seen and updated.
   * @summary switch between different postcards uploaded.
   * @param {Event} e - Event Object.
   * @param {imgProp} card - imgProp object contianing img data.
   */

  /**
   * @todo use `key` for style updation and `filter()` method.
   * @todo Use `active` class for changing the style of selected card.
   */
  const handleCard = (e: Event, card: imgProp) => {
    if (card === imgSrc) return;

    let img = e.target as HTMLImageElement;

    let otherImgs = document.querySelectorAll(".small__card");
    // Change style as per active tile
    otherImgs.forEach((element) => {
      (<HTMLImageElement>element).style.opacity = "0.5";
      (<HTMLImageElement>element).style.maxWidth = "100px";
    });

    img.style.opacity = "1";
    img.style.maxWidth = "120px";

    imgSrc = card;
  };
</script>

<main class="container__poster">
  {#key imgSrc}
    <div
      class="post__card"
      in:fly={{ y: -200, delay: 300 }}
      out:fly={{ y: 200, duration: 300 }}
    >
      <img
        src={imgSrc.imgSrc}
        alt="PostCard"
        style={`rotate:${imgSrc.rotate};scale:${imgSrc.scale}`}
      />
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
        style={`opacity:${card.opacity};max-width:${card.maxWidth}`}
        on:click={(e) => handleCard(e, card)}
      />
    {/each}

    <!--
      Upload image section
    -->
    <form on:submit|preventDefault={(e) => handleUpload(e)}>
      <input type="file" required accept="image/*" />
      <button type="submit">Upload</button>
    </form>
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
  .post__card > img {
    object-fit: contain;
    border-radius: 20px;
    max-width: 600px;
    width: 100%;
  }
  .add__cards {
    padding: 20px 0px 10px 0px;
    border-top: 1px solid;
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
  }
  form {
    display: flex;
    flex-direction: column;
    margin: 0px 10px 0px 10px;
    max-width: 100px;
  }
  @media screen and (max-width: 750px) {
    .container__poster {
      margin-bottom: 20px;
      padding: 10px 0px 10px 0px;
    }
  }
</style>
