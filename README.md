## Base test framework for GPM

Simple base framework with:

- Before hooks
- Fixtures
- Report with screen capture
- Video recording

#### Decisions

- Base framework [Cypress](https://www.cypress.io/)

  - Easy locators handler
  - Html report and great test runner check
    [runner](https://www.cypress.io/features)
  - Parallel tests, visual regression ...

- Why not pageObject pattern ?
  - https://blog.getgauge.io/are-page-objects-anti-pattern-21b6e337880f
  - https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/

#### Installation

- npm i -D cypress
- npm install

#### Run tests

- Visual mode with `npm run e2e:report`
- Headless mode with `npm run e2e:report:headless`

The html report can be found in
`cypress\report\mochawesome-report\mochawesome.html`

Want to know more about cypress runner ? check
[runner-features](https://www.cypress.io/features)
