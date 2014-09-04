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

use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Gitcolab\Bundle\AppBundle\Model\Key;

class LoadUserKeyData extends AbstractFixture implements OrderedFixtureInterface
{
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
        $manager->persist($key);

        $key  = (new Key())
            ->setUser($this->getReference('ena'))
            ->setTitle('Laptop-office')
            ->setKey('key-Laptop-office')
        ;
        $manager->persist($key);

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
