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
use Symfony\Component\DependencyInjection\ContainerAwareTrait;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Gitcolab\Model\Key;

class LoadUserKeyData extends Fixture implements OrderedFixtureInterface, ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * {@inheritdoc}
     */
    public function load(ObjectManager $manager)
    {
        $key  = (new Key())
            ->setUser($this->getReference('ena'))
            ->setTitle('Laptop-home')
            ->setKey('key-laptop-home');
        ;
        $this->container->get(DomainManager::class)->create($key);

        $key  = (new Key())
            ->setUser($this->getReference('ena'))
            ->setTitle('Laptop-office')
            ->setKey('key-Laptop-office')
        ;
        $this->container->get(DomainManager::class)->create($key);

        $manager->flush();
    }

    /**
     * {@inheritDoc}
     */
    public function getOrder()
    {
        return 20;
    }
}
