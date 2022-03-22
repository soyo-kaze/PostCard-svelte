<script lang="ts">
  import ActionPanel from "./components/ActionPanel.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import PosterPanel from "./components/PosterPanel/PosterPanel.svelte";

  export let name: string;
</script>

<main>
  <Header />
  <div class="container">
    <PosterPanel />
    <ActionPanel />
  </div>
  <Footer />
</main>

<style>
  main {
    max-height: 82vh;
    height: 100%;
  }
  .container {
    height: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(194, 245, 228);
  }
  @media screen and (max-width: 750px) {
    .container {
      flex-direction: column;
      padding: 10px;
    }
  }
</style>
