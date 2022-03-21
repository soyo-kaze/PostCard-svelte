<script lang="ts">
</script>

<main class="container__action">
  <div>ActionPanel</div>
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
  @media screen and (max-width: 750px) {
    .container__action {
      max-width: 100%;
      height: 20%;
    }
  }
</style>
