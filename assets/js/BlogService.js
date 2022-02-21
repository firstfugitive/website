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


const BlogService = {
  fetchAll
}

export default BlogService;

async function fetchAll(descending = false) {
  let result = await client.getEntries({
    content_type: 'page',
    'fields.content.sys.contentType.sys.id': 'pageContentBlog',
    limit: 1000
  }).then((res) => res.items);

  return result;
}