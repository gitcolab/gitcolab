Feature: Login

  Scenario: Inactive user can't login
    When I am on route "fos_user_security_login"
    When I fill in the following:
      | Username | dexter.schwartz |
      | Password | dexter.schwartz |
    And I press "Login"
    And I should see "User account is disabled."

  Scenario: Remember me cookie works

  # First, verify behavior without "remember me"
    Given I am on "/login"
    When I fill in the following:
      | Username | ena |
      | Password | ena |
    And I follow "Login"
    When I delete cookie "PHPSESSID"
    Given I am on "/login"
    When I fill in the following:
      | Username | ena |
      | Password | ena |
    And I check "remember_me"
    And I follow "Login"
    When I delete cookie "PHPSESSID"

  Scenario: Log in with bad credentials
    When I am on route "fos_user_security_login"
    When I fill in the following:
      | Username | bar |
      | Password | bar |
    And I press "Login"
    And I should see "Invalid username or password"