import { createClient } from "contentful";

const config = {
  space: 'dbcppdxw8bib',
  accessToken: 'XIOUq8XaCeuhXgblbO1DA2mgHX-uo1bAseK-FZ6jqJQ',/* preview, cdn */
  host: 'cdn.contentful.com',
  environment: 'master'
}

function createClientCF() {
  return createClient(config)
}

const Contentful = {
  createClientCF
}

export default Contentful;
