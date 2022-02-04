<template>
  <div>
    <h1>Hello world!</h1>
    <pre>{{ slug }}</pre>
    <pre>{{ urlSubfolder }}</pre>
  </div>
</template>

<script>
//import Contentful from "./plugins/contentful.js";
import { createClient } from "contentful";
import { useBody, useCookies, useQuery } from 'h3'
import { useRoute } from 'vue-router'


//console.log("CTX", useRoute())

const client = createClient({
  space: 'dbcppdxw8bib',
  accessToken: 'XIOUq8XaCeuhXgblbO1DA2mgHX-uo1bAseK-FZ6jqJQ',/* preview, cdn */
  host: 'cdn.contentful.com',
  environment: 'master'
});


export default {
  name: "Page",
  async setup(props, ctx) {
    /* console.log("CTX", ctx)
    console.log("hello", "world")
    const route = ctx.route.path;
    let pathParts = route.split('/').filter(e => e !== '');
    let slug = pathParts.reverse()[0];
    let urlSubfolder = route.substr(0, route.lastIndexOf(slug));
    slug = slug || 'index';

    if (true) {
      console.info('ROUTE', route);
      console.info('NAME', ctx.route.name);
      console.info('URL-SUBFOLDER', urlSubfolder);
      console.info('SLUG', slug);
    } */
      //console.log("CTX", useRequestHeaders())
    //console.log("CTX", useRequestHeaders())
    //console.log("CTX", useQuery())
    const { path, params, query } = useRoute();
    let pathParts = params?.slug ? params.slug : [];
    let slug = pathParts[pathParts.length -1];
    let urlSubfolder = path.substr(0, path.lastIndexOf(slug)) || '/';
    slug = slug || 'index';


    const { data } = await useAsyncData('fetchEntries', 
      () => client.getEntries({
      content_type: 'page',
      'fields.slug': slug,
      include: 6
    }).then((response) => {
      return response.items[0]
    }))

    //const { data } = await useAsyncData('test', () => $fetch('/api/hello'))


    return {
      data,
      slug,
      urlSubfolder
    };
  },
  mounted() {
    //console.log("ROUTE", window.location.href)
  }
}
</script>

<style>

</style>