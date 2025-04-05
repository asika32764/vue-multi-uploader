<script setup lang="ts">
import CardExample from '@/docs/examples/CardExample.vue';
import CardIconsExample from '@/docs/examples/CardIconsExample.vue';
import CardSortableExample from '@/docs/examples/CardSortableExample.vue';
import ListExample from '@/docs/examples/ListExample.vue';
import ListManualStartExample from '@/docs/examples/ListManualStartExample.vue';
import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const installation = `npm i vue-multi-uploader --save

# OR

yarn add vue-multi-uploader
`;
</script>

<template>
<div class="container py-5 d-flex flex-column gap-5">
  <header class="text-center mx-auto" style="max-width: 650px">
    <h1 class="mb-4">Vue Multi Uploader</h1>

    <div class="d-flex gap-2 justify-content-center mb-3">
      <div>
        <a href="https://www.npmjs.com/package/vue-multi-uploader" target="_blank">
          <img src="https://img.shields.io/npm/v/vue-multi-uploader.svg?style=flat-square" alt="Version">
        </a>
      </div>
      <div>
        <img src="https://img.shields.io/npm/l/vue-multi-uploader.svg?style=flat-square" alt="License">
      </div>
    </div>

    <p class="lead">
      A Vue.js 3 headless / ready-use multi-uploader package.
    </p>

    <div class="d-flex gap-2 justify-content-center">
      <a class="btn btn-primary" href="https://github.com/asika32764/vue-multi-uploader#readme"
        target="_blank">
        <FontAwesomeIcon :icon="faFile" />
        Documentation
      </a>

      <a class="btn btn-dark" href="https://github.com/asika32764/vue-multi-uploader"
        target="_blank">
        <FontAwesomeIcon :icon="faGithub" />
        GitHub
      </a>

      <a class="btn btn-danger" href="https://www.npmjs.com/package/vue-multi-uploader"
        target="_blank">
        <FontAwesomeIcon :icon="faNpm" />
        NPM
      </a>
    </div>
  </header>

  <section>
    <h2 class="text-center mb-3">Installation</h2>

    <div class="mx-auto" style="max-width: 650px">
      <pre class="bg-dark p-3 text-light rounded" v-html="installation"></pre>
    </div>
  </section>

  <div class="mx-auto d-flex flex-column gap-5" style="max-width: 800px; width: 100%;">
    <section>
      <h2 class="text-center mb-3">List Example</h2>

      <ListExample />
    </section>

  </div>

  <div class="mx-auto d-flex flex-column gap-5" style="max-width: 800px; width: 100%;">
    <section>
      <h2 class="text-center mb-3">Manually Start Upload</h2>

      <ListManualStartExample />
    </section>

  </div>

  <div class="mx-auto d-flex flex-column gap-5" style="max-width: 800px; width: 100%;">
    <section>
      <h2 class="text-center mb-3">Card Example</h2>

      <CardExample />
    </section>

  </div>

  <div class="mx-auto d-flex flex-column gap-5" style="max-width: 800px; width: 100%;">
    <section>
      <h2 class="text-center mb-3">Card Sortable Example</h2>

      <CardSortableExample />
    </section>

  </div>

  <div class="mx-auto d-flex flex-column gap-5" style="max-width: 800px; width: 100%;">
    <section>
      <h2 class="text-center mb-3">Card With Custom Icons</h2>

      <CardIconsExample />
    </section>

  </div>

  <footer class="mt-5 text-center">
    Made by <a href="https://simular.co" target="_blank">Simular</a>
  </footer>
</div>
</template>

<style scoped>

</style>
