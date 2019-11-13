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
use Gitcolab\Model\Project;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class LoadProjectData extends Fixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $foobar = new Project();
        $foobar
            ->setName('Foobar')
            ->setSlug('foobar')
            ->setRepositorySize(256)
            ->setDefaultBranch('new-feature')
            ->setOrganization($this->getReference('organization-foobar'))
        ;

        $this->container->get(DomainManager::class)->create($foobar);
        $this->setReference('project-foobar', $foobar);

        $galasphere = new Project();
        $galasphere
            ->setName('Galasphere')
            ->setSlug('galasphere')
            ->setRepositorySize(256)
            ->setDefaultBranch('master')
            ->setOrganization($this->getReference('organization-bar'))
        ;
        $this->container->get(DomainManager::class)->create($galasphere);

        $empty = new Project();
        $empty
            ->setName('Empty')
            ->setSlug('empty')
            ->setRepositorySize(0)
            ->setOrganization($this->getReference('organization-foo'))
        ;
        $this->container->get(DomainManager::class)->create($empty);
        $this->setReference('project-empty', $empty);
    }

    public function getOrder()
    {
        return 40;
    }
}
