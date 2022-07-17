describe("Testing google", () => {
  it("I can search", () => {
    cy.visit("https://google.com/");
    cy.get("input[title='Поиск']").type(")").type("{enter}");
  });
});
