Feature: Create Team

  Background:
    Given I am connected as "ena"

  Scenario: create a team
    When I go to "organization/bar/teams"
    Given I follow "Create"
    And I fill in the following:
      | Name        | Core team |
      | Description | Core team |
    And I select "ACCESS_READ" from "Access"
    And press "Create"
    And I should see "Core team"