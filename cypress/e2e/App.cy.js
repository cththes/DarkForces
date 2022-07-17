describe("App E2e", () => {
  it("should have a form", () => {
    cy.visit("localhost:3000");

    cy.get("#draw_card", {
      timeout: 20000,
    }).should("have.text", "Вытянуть карту");
  });
  it("should click a button", () => {
    cy.contains("Вытянуть карту").click();
    cy.get("div");
    //cy.get("playerInfo");
  });
  it("should click a button", () => {
    cy.contains("Закончить ход").click();
  });
  it("should click a button", () => {
    cy.contains("Начать заново").click();
    cy.get("deck").should("have.length", 0);
  });
});
