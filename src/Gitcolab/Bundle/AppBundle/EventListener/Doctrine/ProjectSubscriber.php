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

use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\Common\EventSubscriber;
use Doctrine\ORM\Events;

use Gitcolab\Bundle\AppBundle\Model\Project;
use Gitcolab\Bundle\AppBundle\Git\RepositoryPoolSubscriber;

class ProjectSubscriber implements EventSubscriber
{
    protected $repositoryPool;

    public function __construct(RepositoryPoolSubscriber $repositoryPool)
    {
        $this->repositoryPool = $repositoryPool;
    }

    public function getSubscribedEvents()
    {
        return array(
            Events::postLoad
        );
    }

    public function postLoad(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        if (!$entity instanceof Project) {
            return;
        }

        $entity->setRepository($this->repositoryPool->getGitRepository($entity));
    }
}