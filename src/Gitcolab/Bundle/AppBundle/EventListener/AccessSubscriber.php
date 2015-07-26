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

use Gitcolab\Bundle\AppBundle\GitcolabEvents;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Sylius\Component\Resource\Event\ResourceEvent;
use Gitcolab\Bundle\AppBundle\Model\Team;
use Gitcolab\Bundle\AppBundle\Model\Access;
use Gitcolab\Bundle\AppBundle\Manager\DomainManager;

class AccessSubscriber implements EventSubscriberInterface
{
    /**
     * @var DomainManager
     */
    protected $domainManager;

    /**
     * @var TokenInterface
     */
    protected $tokenStorage;

    /**
     * @param DomainManager $domainManager
     * @param TokenInterface $tokenStorage
     */
    public function __construct(DomainManager $domainManager, TokenInterface $tokenStorage)
    {
        $this->tokenStorage = $tokenStorage;
        $this->domainManager = $domainManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            GitcolabEvents::ORGANIZATION_CREATE => 'createOrganization'
        ];
    }

    /**
     * @param ResourceEvent $event
     */
    public function createOrganization(ResourceEvent $event)
    {
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