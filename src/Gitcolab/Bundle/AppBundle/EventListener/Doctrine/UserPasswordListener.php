<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\EventListener\Doctrine;

use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Gitcolab\Bundle\AppBundle\Model\User\User;
use Symfony\Component\Security\Core\Encoder\EncoderFactory;

class UserPasswordListener implements EventSubscriber
{
    /**
     * @var EncoderFactory
     */
    private $encoderFactory;

    public function __construct(EncoderFactory $encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
    }

    /**
     * Register this class on prePersist and preUpdate
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
