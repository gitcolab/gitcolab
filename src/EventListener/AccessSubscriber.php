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

use Gitcolab\DomainManager;
use Gitcolab\Event\OrganizationEvent;
use Gitcolab\Events;
use Gitcolab\Model\Access;
use Gitcolab\Model\Team;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class AccessSubscriber implements EventSubscriberInterface
{
    /*** @var DomainManager */
    protected $domainManager;

    /** @var TokenStorageInterface */
    protected $tokenStorage;

    public function __construct(DomainManager $domainManager, TokenStorageInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
        $this->domainManager = $domainManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::ORGANIZATION_CREATE => 'createOrganization',
        ];
    }

    public function createOrganization(OrganizationEvent $event)
    {
        if (null === $this->tokenStorage->getToken()) {
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
