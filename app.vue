<template>
  <h1>Hello world!</h1>
</template>

<script>
//import Contentful from "./plugins/contentful.js";
import { createClient } from "contentful";
import { useBody, useCookies, useQuery } from 'h3'


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
    console.log("CTX", useQuery())
    
    const { data } = await useAsyncData('fetchEntries', 
      (ctx) => client.getEntries({
      content_type: 'page',
      'fields.slug': "home",
      include: 6
    }).then((response) => {
      return response.items[0]
    }))
    return {
      hello: "world",
      data
    };
  },
  mounted() {
    console.log("ROUTE", window.location.href)
  }
}
</script>

<style>

</style>