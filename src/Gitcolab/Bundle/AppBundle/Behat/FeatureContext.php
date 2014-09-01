<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Behat;

/**
 * Features context.
 */
class FeatureContext extends BaseContext
{
    /**
     * @Given /^I am on route "([^"]*)"$/
     */
    public function iAmOnRoute($route)
    {
        $url = $this->kernel->getContainer()->get('router')->generate($route, array(), false);
        $this->getSession()->visit($this->locatePath($url));
    }

    /**
     * @Given /^I delete cookie "([^"]*)"$/
     */
    public function iDeleteCookie($route)
    {
        $session = $this->getSession();
        $session->restart();
    }

    /**
     * @Given /^I logout$/
     */
    public function iLogout()
    {
        return array(
            new When('I am on "/logout"'),
        );
    }

    /**
     * @Given /^I am connected as "((?:[^"]|"")*)"(?: with password "((?:[^"]|"")*)")?$/
     */
    public function iAmConnectedAs($username, $password = '')
    {
        $password = $password ?: $username;

        $this->getSession()->visit($this->generatePageUrl('fos_user_security_login'));

        $this->fillField('Username', $username);
        $this->fillField('Password', $password);
        $this->pressButton('_submit');
        $this->assertPageContainsText('logout');
    }
}