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

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Gitcolab\DomainManager;
use Gitcolab\Model\Access;
use Gitcolab\Model\Organization;
use Gitcolab\Model\Team;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class LoadOrganizationData extends Fixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $organization = (new Organization())
            ->setEmail('foo@foo.io')
            ->setName('Foo')
            ->addTeam($this->createTeam($this->getReference('beck.nash')))
            ->addAccess($this->getReference('beck.nash'), Access::TYPE_OWNER)
        ;

        $this->container->get(DomainManager::class)->create($organization);
        $this->setReference('organization-foo', $organization);

        $organization = (new Organization())
            ->setEmail('bar@bar.io')
            ->setName('Bar')
            ->addTeam($this->createTeam($this->getReference('ann.perry')))
            ->addAccess($this->getReference('beck.nash'), Access::TYPE_OWNER)
        ;
        $this->container->get(DomainManager::class)->create($organization);
        $this->setReference('organization-bar', $organization);

        $organization = (new Organization())
            ->setName('FooBar')
            ->setEmail('foobar@foobar.io')
            ->addTeam($this->createTeam($this->getReference('ann.perry')))
            ->addAccess($this->getReference('beck.nash'), Access::TYPE_COLLABORATOR)
        ;
        $this->container->get(DomainManager::class)->create($organization);
        $this->setReference('organization-foobar', $organization);
    }

    public function createTeam($user)
    {
        $team = new Team();
        $team
            ->setName('Owner')
            ->setSlug('owner')
            ->addAccess($user);

        return $team;
    }

    /**
     * {@inheritdoc}
     */
    public function getOrder()
    {
        return 30;
    }
}
