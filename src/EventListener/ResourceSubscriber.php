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
use Gitcolab\Events;
use Psr\Log\LoggerInterface;
use Sylius\Component\Resource\Event\ResourceEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ResourceSubscriber implements EventSubscriberInterface
{
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @var DomainManager
     */
    protected $domainManager;

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
            Events::ISSUE_CREATE => 'onTrackerCreate',
        ];
    }

    public function onTrackerPreCreate(ResourceEvent $event)
    {
        $ticket = $event->getSubject();
        var_dump($ticket->getProject()->getTickets()->count());

        $lastTicket = $ticket->getProject()->getTickets()->last();

        if (null === $lastTicket) {
            $ticket->setNumber(1);
        } else {
            $ticket->setNumber($lastTicket->getNumber() + 1);
        }
    }

    public function onTrackerCreate(ResourceEvent $event)
    {
        $tracker = $event->getSubject();
        $tracker->addParticipant($this->tokenStorage->getToken()->getUser());

        $this->domainManager->update($tracker);
    }
}
