<template>
  <div>
    <!-- <page-header :data="headerObject"></page-header>
    <h1>Hello world!</h1>
    <pre>{{ slug }}</pre>
    <pre>{{ urlSubfolder }}</pre>
    <page-footer :data="footerObject"></page-footer>
     -->
    <component
      :is="contentType"
      :data="pageContent"
      :standardPageConfig="standardPageConfig"
    />
  </div>
</template>

<script>
//import Contentful from "./plugins/contentful.js";


//import { contentfulConfig } from "../plugins/contentful.js";
//import { useBody, useCookies, useQuery } from 'h3'
import { useRoute } from 'vue-router'
import PageFooter from '../components/organism/PageFooter.vue'
import PageHeader from '../components/organism/PageHeader.vue'


//console.log("CTX", useRoute())

//DEV:
/* import { createClient } from "contentful";
const client = createClient({
  space: 'dbcppdxw8bib',
  accessToken: 'XIOUq8XaCeuhXgblbO1DA2mgHX-uo1bAseK-FZ6jqJQ',
  host: 'cdn.contentful.com',
  environment: 'master'
}); */

//PROD:
import Contenful from "contentful";
const client = Contenful.createClient({
  space: 'dbcppdxw8bib',
  accessToken: 'XIOUq8XaCeuhXgblbO1DA2mgHX-uo1bAseK-FZ6jqJQ',
  host: 'cdn.contentful.com',
  environment: 'master'
});


export default {
  name: "Page",
  components: { PageFooter, PageHeader },
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


    /* let { data: pageObject } = await useAsyncData('pageObject', 
      () => {
        return client.getEntries({
          content_type: 'page',
          'fields.slug': slug,
          include: 6
        }).then((response) => response.items[0] )
      }) */
    
    let { data } = await useAsyncData('dataFetch', 
      () => Promise.all([
        client.getEntries({
          content_type: 'page',
          'fields.slug': slug,
          include: 6
        }).then((response) => response.items[0] ),
          client.getEntries({
          content_type: 'standardPageConfig',
          include: 6
        }).then((response) => response.items[0])
      ]).then((response) => response)
    );
    let pageObject = data[0], standardPageConfig = data[1];
    /* const { standardPageConfig } = await useAsyncData('fetchEntries', 
      () => client.getEntries({
          content_type: 'standardPageConfig',
          include: 6
        }).then((response) => response.items[0])) */

    //fetch standard page configuration
    /* let standardPageConfig = await client.getEntries({
      content_type: 'standardPageConfig',
      include: 6
    }).then((response) => response.items[0]); */

    //const { data } = await useAsyncData('test', () => $fetch('/api/hello'))


    return {
      data,
      slug,
      urlSubfolder
    };
  },
  computed: {
    pageObject() {
      return this.data && this.data.length > 0 ? this.data[0] : {};
    },
    standardPageConfig() {
      return this.data && this.data.length > 1 ? this.data[1] : {};
    },
    pageContent() {
      if (!this.pageObject?.fields?.content) {
        return undefined;
      }
      return this.pageObject.fields.content;
    },
    contentType() {
      return this.pageContent?.sys?.contentType?.sys?.id;
    },
    footerObject() {
      return this.standardPageConfig?.fields?.footer;
    },
    headerObject() {
      return this.standardPageConfig?.fields?.header;
    }
  },
  mounted() {
    //console.log("ROUTE", window.location.href)
  }
}
</script>

<style>

</style>