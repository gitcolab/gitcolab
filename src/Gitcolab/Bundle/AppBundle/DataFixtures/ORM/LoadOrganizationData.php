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

use Gitcolab\Bundle\AppBundle\Model\Organization;

class LoadOrganizationData extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $organization = (new Organization())
            ->addUser($this->getReference('ena'), 'ROLE_ADMIN')
            ->setEmail('foo@foo.io')
            ->setName('Foo')
        ;
        $manager->persist($organization);

        $organization = (new Organization())
            ->addUser($this->getReference('ena'), 'ROLE_USER')
            ->setEmail('bar@bar.io')
            ->setName('Bar')
        ;
        $manager->persist($organization);


        $organization = (new Organization())
            ->setName('FooBar')
            ->addUser($this->getReference('ena'), 'ROLE_USER')
            ->setEmail('foobar@foobar.io')
            ->setName('FooBar')
        ;
        $manager->persist($organization);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 30;
    }
}
