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

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\UserEvent;
use Gitcolab\Bundle\AppBundle\Model\Organization;

class CreateUserOrganizationSubscriber
{
    public $entityManager;

    public function __construct($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_INITIALIZE => 'onRegistrationInitialise'
        );
    }

    public function onRegistrationInitialise(UserEvent $event)
    {
        $organization = new Organization();
        $organization->setName($event->getUser()->getUsername());
        $organization->setEmail($event->getUser()->getEmail());

        $this->entityManager->persist($organization);
        $this->entityManager->flush();
    }
}