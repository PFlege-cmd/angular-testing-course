describe("Homepage", () => {
  it("should display all courses", () => {
    //cy.fixture('courses.json').as('courses');
    cy.intercept('GET', 'localhost:9000/api/courses',{
      fixture: 'courses.json'
    })
    cy.visit('/');
    cy.contains('All Courses')
    //cy.get('mat-card').should('have.length', 9)
  })
})
