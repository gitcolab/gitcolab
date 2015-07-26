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
use Psr\Log\LoggerInterface;
use Gitcolab\Bundle\AppBundle\Model\Project;
use Gitcolab\Bundle\AppBundle\Git\Repository;

/***
 * Inject repository in entity
 * @since 1.0
 */
class ProjectSubscriber implements EventSubscriber
{
    protected $logger;
    protected $repositoryPath;

    /**
     * @param $repositoryPath
     */
    public function __construct(LoggerInterface $logger, $repositoryPath)
    {
        $this->logger = $logger;
        $this->repositoryPath = $repositoryPath;
    }

    /**
     * Register this class on prePersist and preUpdate
     *
     * @return array
     */
    public function getSubscribedEvents()
    {
        return array(
            Events::postLoad,
        );
    }

    /**
     * @param LifecycleEventArgs $args
     */
    public function postLoad(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        if (!$entity instanceof Project) {
            return;
        }

        $project = $entity;
        $path = $this->repositoryPath.'/'.$project->getSlug().'.git';
        $repository = new Repository($path, ['logger' => $this->logger]);

        $entity->setRepository($repository);
    }
}
