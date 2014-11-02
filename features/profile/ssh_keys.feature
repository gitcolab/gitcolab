Feature: Manage SSH keys

  Scenario: I can see my SSH keys
    Given I am connected as "ena"
    And I am on "/user/ssh"
    And I should see "Laptop-home"
    And I should see "Laptop-office"

  Scenario: I can create a new SSH key
    Given I am connected as "ena"
    And I should not see "Laptop-friend"
    When I am on "/user/ssh"
    And I fill in the following:
      | Title | Laptop-friend     |
      | Key   | key-Laptop-friend |
    And I press "Save"
    Then I should see "SSH key created!"
