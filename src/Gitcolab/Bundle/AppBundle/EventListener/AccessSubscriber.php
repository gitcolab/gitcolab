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
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Sylius\Component\Resource\Event\ResourceEvent;
use Gitcolab\Bundle\AppBundle\Model\Team;
use Gitcolab\Bundle\AppBundle\Model\Access;
use Tempo\Bundle\ResourceExtraBundle\Manager\DomainManager;

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
            GitcolabEvents::ORGANIZATION_CREATE => 'createOrganization'
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
