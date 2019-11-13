<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\EventListener\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Gitcolab\Model\User;
use Symfony\Component\Security\Core\Encoder\EncoderFactory;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class UserPasswordListener implements EventSubscriber
{
    /**
     * @var EncoderFactory
     */
    private $encoderFactory;

    public function __construct(EncoderFactoryInterface $encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
    }

    /**
     * Register this class on prePersist and preUpdate.
     *
     * @return array
     */
    public function getSubscribedEvents()
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }

    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if (!$entity instanceof User || null === $entity->getPlainPassword()) {
            return;
        }

        $this->updatePassword($entity);
    }

    public function preUpdate(PreUpdateEventArgs $args)
    {
        $entity = $args->getEntity();
        if (!$entity instanceof User || null === $entity->getPlainPassword()) {
            return;
        }

        $this->updatePassword($entity);
        $args->setNewValue('password', $entity->getPassword());
    }

    private function updatePassword(User $entity)
    {
        $password = $this->encoderFactory->getEncoder($entity)->encodePassword(
            $entity->getPlainPassword(), $entity->getSalt()
        );
        $entity->setPassword($password);
        $entity->eraseCredentials();
    }
}
