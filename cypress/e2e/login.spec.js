describe('Login', () => {
  context('Invalid user credentials', () => {
    before(() => {
      cy.visit(
        'https://fsext1.dnv.com/adfs/ls/?SAMLRequest=rVLLbsIwEPyVyPfEcUp4WIBEQVWRqIoK7aEXZJwNWErWqddB7d83CS1tL5x69O6Md2Z2x6TKopKz2h%2fxCd5qIB%2b8lwWSbBsTVjuUVpEhiaoEkl7LzexhJZMolooInDcWWbBcTNhO6X0%2fuemnoeiNhmFvKCAcDcUozBWkGsRA5zcxC17AUcOZsOaLhkhUwxLJK%2fRNKW7g8TAU6VYIGQ9k0oviJO0n6SsLFo02g8p35KP3FUnOc4J3L6IMT5G2JVdZTrwgzoI76zR0tiYsVwVBO2vdSDYnuFTWznqrbXFrMDN4uG53fwaRvN9u1%2bH6cbNlwew7grlFqktwG3Ano%2bH5afWjsbAHg1FptLNkc2%2bxMAidXA%2b8UX4o9omunM0iixdU179N5jsx2%2b0VAe8WxYksv%2bSuv4ayXyurrpuovhyz6bhFyy5%2f16ZVKn%2bd2lZMFuYdVAJ64z%2fY9F9NjvkvUdPz6%2b9xTj8B&RelayState=StateProperties%3deyJUSUQiOiIxYTc0ODQ5Ni04ODAwLTRkODYtOGQ1Yy1hN2M4Y2RlN2E5ZjgifQ&SigAlg=http%3a%2f%2fwww.w3.org%2f2000%2f09%2fxmldsig%23rsa-sha1&Signature=U2zfJUWKDfwBLLf8roV8DyRFgSkciHRcgpX06HEy7lsT6LgJo5fHiqEF%2f%2bm4JsvZ0dIg1%2fjRkpct90ZVc%2bkGOSY%2bZs3dCPSXL%2baEiraA8z5HVLKznocFdY%2bCkX5TU2qxJL2t8cOLthUS%2fTHyl0hDiLXbMJE9%2bvcQoA22uwS73Zz%2bAk6tkOT2HrY%2fyDAA1SWvbS6Fc6QMHnTP3WASsit%2brA%2fComAYKsZ2dLE5oAkZBRzN9%2fwH7aYO5284lSk5v%2fp33CFGRpGZCl9CD8XxTscTCvh85WoQlHrGPy4%2fqtuuuMKmDa6mvUtbkrnofhRkmcCb2ubLSiiEHrMEtoThiL4DZQ%3d%3d&RedirectToIdentityProvider=http%3a%2f%2ffsext1.dnv.com%2fadfs%2fservices%2ftrust',
      )
      cy.get('#userNameInput').type('fakeusername')
      cy.get('#passwordInput').type('fakepassword{enter}')
    })

    it('Error message should appear with the correct text', () => {
      cy.get('#errorText').should(
        'contain',
        'Incorrect email or password. Please try again.',
      )
    })

    it('Username input should have the input text', () => {
      cy.get('#userNameInput').should('have.value', 'fakeusername')
    })

    it('Password input should be empty', () => {
      cy.get('#passwordInput').should('be.empty')
    })

    it('Example FAILING spec with screen capture', () => {
      cy.get('#alwaysfail').should('have.value', 'fakeusername')
    })
  })
})
