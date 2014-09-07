<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\EventListener;

use Doctrine\ORM\EntityManagerInterface;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\UserEvent;
use Gitcolab\Bundle\AppBundle\Model\Organization;

class CreateUserOrganizationSubscriber
{
    public $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_COMPLETED => 'onRegistrationInitialise'
        );
    }

    /**
     * @param UserEvent $event
     */
    public function onRegistrationInitialise(UserEvent $event)
    {
        $user = $event->getUser();

        $organization = (new Organization())
            ->setName($user->getUsername())
            ->setEmail($user->getEmail());

        $this->persistAndFlush($organization);

        $organization ->addUser($user, 'ROLE_ADMIN');

        $this->persistAndFlush($organization);

    }

    public function persistAndFlush($entity)
    {
        $this->entityManager->persist($entity);
        $this->entityManager->flush();
    }
}
