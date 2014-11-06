<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;

use Gitcolab\Bundle\AppBundle\Model\User\User;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;


class LoadUserData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    private $container;

    /**
     * {@inheritdoc}
     */
    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {

        //$userManager = $this->container->get('fos_user.user_manager');
        $userFactory = $this->container->get('gitcolab_app.user.factory');
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

            $account = $userFactory->createUser([
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

            if($username == 'dexter.schwartz') {
                $account->setEnabled(false);
            }
            //$account->setToken(sha1(uniqid(rand(), true)));
            //$userManager->updateUser($account, true);

            //$dispatcher = $this->container->get('event_dispatcher');
            //$dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, new FilterUserResponseEvent($account, new Request(), new Response()));

            $this->addReference($username, $account);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 10;
    }
}
