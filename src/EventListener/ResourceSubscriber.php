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

use Sylius\Component\Resource\Event\ResourceEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Psr\Log\LoggerInterface;
use Gitcolab\DomainManager;
use Gitcolab\Events;

class ResourceSubscriber  implements EventSubscriberInterface
{
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     *
     * @var DomainManager
     */
    protected $domainManager;

    /**
     * @param LoggerInterface $logger
     * @param DomainManager $domainManager
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(LoggerInterface $logger, DomainManager $domainManager, TokenStorageInterface $tokenStorage)
    {
        $this->logger = $logger;
        $this->domainManager = $domainManager;
        $this->tokenStorage = $tokenStorage;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::PR_CREATE => 'onTrackerCreate',
            Events::ISSUE_PR_CREATE => 'onTrackerPreCreate',
            Events::ISSUE_CREATE => 'onTrackerCreate'
        ];
    }

    /**
     * @param ResourceEvent $event
     */
    public function onTrackerPreCreate(ResourceEvent $event)
    {
        $ticket = $event->getSubject();
        var_dump($ticket->getProject()->getTickets()->count());

        $lastTicket = $ticket->getProject()->getTickets()->last();

        if (null == $lastTicket) {
            $ticket->setNumber(1);
        } else {
            $ticket->setNumber($lastTicket->getNumber() + 1);
        }
    }

    /**
     * @param ResourceEvent $event
     */
    public function onTrackerCreate(ResourceEvent $event)
    {
        $tracker = $event->getSubject();
        $tracker->addParticipant($this->tokenStorage->getToken()->getUser());

        $this->domainManager->update($tracker);
    }
}
