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
use Gitcolab\Bundle\AppBundle\Model\Team;
use Gitcolab\Bundle\AppBundle\Model\Access;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;

class LoadOrganizationData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
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

        $this->container->get('gitcolab.domain_manager')->create($organization);
        $this->setReference('organization-foo', $organization);

        $organization = (new Organization())
            ->setEmail('bar@bar.io')
            ->setName('Bar')
            ->addTeam($this->createTeam($this->getReference('ann.perry')))
            ->addAccess($this->getReference('beck.nash'), Access::TYPE_OWNER)
        ;
        $this->container->get('gitcolab.domain_manager')->create($organization);
        $this->setReference('organization-bar', $organization);

        $organization = (new Organization())
            ->setName('FooBar')
            ->setEmail('foobar@foobar.io')
            ->addTeam($this->createTeam($this->getReference('ann.perry')))
            ->addAccess($this->getReference('beck.nash'), Access::TYPE_COLLABORATOR)
        ;
        $this->container->get('gitcolab.domain_manager')->create($organization);
        $this->setReference('organization-foobar', $organization);
    }

    public function createTeam($user)
    {
        $team = new Team();
        $team
            ->setName('Owner')
            ->addAccess($user);

        return $team;
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 30;
    }
}
