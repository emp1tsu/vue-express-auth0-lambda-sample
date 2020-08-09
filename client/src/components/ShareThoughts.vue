<template>
  <div class="share-thoughts">
    <label for="share-thoughts">What do you want to share?</label>
    <input id="share-thoughts" v-model="text" placeholder="Be nice!" />
    <button v-on:click="shareThoughts">Share!</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MicroPostsService from "../store/MicroPostsService";

@Component
export default class ShareThoughts extends Vue {
  private text = "";

  async shareThoughts() {
    await MicroPostsService.insertMicroPost(this.text);
    this.$router.push("/");
  }
}
</script>
