Feature: Create Team

  Background:
    Given I am connected as "ena"

  Scenario: create a team
    When I go to "bar/galasphere/settings/collaboration"
    And I select "Core team" from "Team"
    And press "Validate"