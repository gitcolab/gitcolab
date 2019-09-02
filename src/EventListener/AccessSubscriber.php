<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\EventListener;

use Gitcolab\Events;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Sylius\Component\Resource\Event\ResourceEvent;
use Gitcolab\Model\Team;
use Gitcolab\Model\Access;
use Gitcolab\DomainManager;

class AccessSubscriber implements EventSubscriberInterface
{
    /**
     * @var DomainManager
     */
    protected $domainManager;

    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * @param DomainManager $domainManager
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(DomainManager $domainManager, TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
        $this->domainManager = $domainManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::ORGANIZATION_CREATE => 'createOrganization'
        ];
    }

    /**
     * @param ResourceEvent $event
     */
    public function createOrganization(ResourceEvent $event)
    {
        if (null === $this->tokenStorage->getToken() ) {
            return;
        }

        $organization = $event->getSubject();
        $team = (new Team())
            ->setName('Owners')
            ->setAccess(Team::ACCESS_OWNER)
            ->setOrganization($organization);

        $access = (new Access())
            ->setResource($team)
            ->setUser($this->tokenStorage->getToken()->getUser());

        $this->domainManager->create($access);
    }
}
