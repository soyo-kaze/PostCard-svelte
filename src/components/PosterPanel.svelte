<script lang="ts">
  /**
   * @todo Implement add__cards section and build cards switching section.
   * @todo Implement image uploading functionality
   */
</script>

<main class="container__poster">
  <div class="post__card">
    <img src="./assets/post.jpg" alt="PostCard" />
  </div>
  <div class="add__cards">Add more cards</div>
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
    rotate: 0deg;
    scale: 1;
  }
  .add__cards {
    padding: 20px 0px 10px 0px;
    border-top: 1px solid;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 750px) {
    .container__poster {
      margin-bottom: 20px;
      padding: 10px 0px 10px 0px;
    }
  }
</style>
