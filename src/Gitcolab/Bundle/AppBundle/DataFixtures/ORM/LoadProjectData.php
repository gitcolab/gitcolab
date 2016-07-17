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

use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Gitcolab\Bundle\AppBundle\Model\Project;

class LoadProjectData extends AbstractFixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @inheritdoc
     */
    public function load(ObjectManager $manager)
    {
        $foobar = new Project();
        $foobar
            ->setName('Foobar')
            ->setRepositorySize(256)
            ->setDefaultBranch('new-feature')
            ->setOrganization($this->getReference('organization-foobar'))
        ;

        $this->container->get('gitcolab.domain_manager')->create($foobar);
        $this->setReference('project-foobar', $foobar);

        $galasphere = new Project();
        $galasphere
            ->setName('Galasphere')
            ->setRepositorySize(256)
            ->setDefaultBranch('master')
            ->setOrganization($this->getReference('organization-bar'))
        ;
        $this->container->get('gitcolab.domain_manager')->create($galasphere);

        $empty = new Project();
        $empty
            ->setName('Empty')
            ->setRepositorySize(0)
            ->setOrganization($this->getReference('organization-foo'))
        ;
        $this->container->get('gitcolab.domain_manager')->create($empty);
        $this->setReference('project-empty', $empty);
    }

    public function getOrder()
    {
        return 40;
    }
}
