const visitDocuments = () => {
  cy.visit('/page.aspx#/documents')
    //.waitForXHR('GET', '/**/sfm?')
    .finishLoading()
    .get('.fm-tree-row-container')
    .contains(/Documents/i)
}

const goToRecent = () => {
  cy.get('.fm-single-node-navigator-item')
    .contains('span', 'Recents')
    .click({force: true})
    .finishLoading()
}

const clearDocuments = () => {
  goToRecent()
  deleteDocuments()
  cy.get('.fm-tree-navigator-text')
    .click()
    .finishLoading()
  deleteDocuments()
}

const createLinkDocument = doc => {
  cy.window().then(win => {
    cy.request({
      method: 'POST',
      url: 'https://proxy.forcemanager.net/documents/link', // baseUrl is prepended to url
      //url: 'https://proxypre.forcemanager.net/documents/link', // baseUrl is prepended to url
      //form: false, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      body: [
        {
          name: 'strFileDescription',
          value: `QA -  ${doc.name}`,
        },
        {name: 'strLink', value: doc.link},
        {name: 'idLibraryFolder', value: '-1'},
        {name: 'blnIsSynchronized', value: 'false'},
        {name: 'strExtension', value: ''},
      ],

      headers: {
        'x-fm-device-type': '101',
        'x-fm-version': '3',
        'x-fm-token': JSON.parse(win.sessionStorage.getItem('config_web4'))
          .token,
      },
    }).then(() => cy.reload())
  })
}

const deleteDocuments = () => {
  cy.window().then(win => {
    let list = JSON.parse(win.sessionStorage.getItem('persist:fm_store'))
      .entityList
    let docs = JSON.parse(list).documents.data

    cy.queryAllByText(/qa - /i, {exact: false}).then(values => {
      if (values.length > 0) {
        let formatedValues = values
          .toArray()
          .map(val => val.innerText.replace(/ /g, ''))

        for (var i = 0; i < docs.length; i++) {
          if (formatedValues.includes(docs[i].description.replace(/ /g, ''))) {
            var endpoint =
              docs[i].is_folder == 1 ? 'folder_documents' : 'documents'
            cy.request({
              method: 'DELETE',
              url: `https://proxy.forcemanager.net/${endpoint}/${docs[i].id}`,
              //https://proxy.forcemanager.net/folder_documents/7029
              //url: `https://proxypre.forcemanager.net/documents/${docs[i].id}`,
              //form: false,

              headers: {
                'x-fm-device-type': '101',
                'x-fm-version': '3',
                'x-fm-token': JSON.parse(
                  win.sessionStorage.getItem('config_web4'),
                ).token,
              },
            })
          }
        }
      }
    })
  })
}

export default {visitDocuments, goToRecent, clearDocuments, createLinkDocument}
