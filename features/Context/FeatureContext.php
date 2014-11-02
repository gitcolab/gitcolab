<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Context;

use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\MinkExtension\Context\RawMinkContext;

/**
 * Features context.
 */
class FeatureContext extends RawMinkContext
{
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
        $this->getSession()->visit('/logout');
    }

    /**
     * @Given /^I am connected as "((?:[^"]|"")*)"(?: with password "((?:[^"]|"")*)")?$/
     */
    public function iAmConnectedAs($username, $password = '')
    {
        $password = !empty($password) ?: $username;

        $this->visit('/login');

        $page = $this->getSession()->getPage();
        $page->fillField('Username', $username);
        $page->fillField('Password', $password);
        $page->pressButton('login');


        if (strpos($page->getContent(), 'logout') === 0) {
            throw new \Exception('Impossible to find "logout" on the current page.');
        }
    }

    private function visit($url)
    {
        $this->getSession()->visit($this->getMinkParameter('base_url') . '/' . $url);
    }
}
