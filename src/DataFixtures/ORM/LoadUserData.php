<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

use Gitcolab\DomainManager;
use Gitcolab\Model\User;
use Gitcolab\User\UserFactory;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class LoadUserData extends Fixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    private $userFactory;

    public function __construct(UserFactory $userFactory)
    {
        $this->userFactory = $userFactory;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $users = [
            'admin'           => 'Ad Min',
            'ena'             => 'Ena Ikimea',
            'john.doe'        => 'John Doe',
            'brian.lester'    => 'Brian Lester',
            'jack.gill'       => 'Jack Gill',
            'olivia.pace'     => 'Olivia Pace',
            'nola weaver'     => 'Nola Weaver',
            'oren tyler'      => 'Oren Tyler',
            'warren.spencer'  => 'Warren Spencer',
            'jacob.gallegos'  => 'Jacob Gallegos',
            'jordan.saunders' => 'Jordan Saunders',
            'xavier.stein'    => 'Xavier Stein',
            'beck.nash'       => 'Beck Nash',
            'ann.perry'       => 'Ann Perry',
            'chase.hoffman'   => 'Chase Hoffman',
            'gregory.joyner'  => 'Gregory Joyner',
            'dexter.schwartz' => 'Dexter Schwartz'
        ];

        foreach ($users as $username => $name) {
            $fullName = explode(' ', $name);

            $account = $this->userFactory->createUser([
                'username' => $username,
                'email'    => $username . '@test.com',
                'lastName' => $fullName[1],
                'firstName' => $fullName[0],
                'plainPassword' => $username,
                'roles' => [User::ROLE_USER]
            ]);

            if ($username == 'admin') {
                $account->addRole(User::ROLE_ADMIN);
            }

            if ($username == 'dexter.schwartz') {
                $account->setEnabled(false);
            }

            $this->addReference($username, $account);

            $this->container->get(DomainManager::class)->create($account, false);
        }

        $this->container->get('doctrine.orm.entity_manager')->flush();
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 10;
    }
}
