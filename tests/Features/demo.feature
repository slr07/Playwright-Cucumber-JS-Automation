@test
Feature: Verify BigCommerce Demo Scenarios for NoFraud Checkout


  Scenario: Verify Playwright page

    Given I Navigate to Playwright page
    When I click on Get Started Link
    Then I verify Get Started Link Page