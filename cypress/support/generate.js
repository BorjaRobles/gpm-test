import {build, fake} from 'test-data-bot'

const documentLinkBuilder = build('Document').fields({
  name: fake(f => f.company.companyName()),
  link: fake(f => f.internet.url()),
})

export {documentLinkBuilder}
