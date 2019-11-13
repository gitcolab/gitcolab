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
use Gitcolab\Git\Admin;
use Gitcolab\Git\Repository;
use Gitcolab\Model\Project;
use Psr\Log\LoggerInterface;
use Sylius\Component\Resource\Event\ResourceEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProjectSubscriber implements EventSubscriberInterface
{
    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * Root directory of every repositories.
     *
     * @var string
     */
    protected $repositoryPath;

    /**
     * Constructor.
     *
     * @param string $repositoryPath Path to the repository root folder
     */

    /**
     * @param $repositoryPath
     */
    public function __construct(LoggerInterface $logger, $repositoryPath, DomainManager $domainManager)
    {
        $this->logger = $logger;
        $this->repositoryPath = $repositoryPath;
        $this->domainManager = $domainManager;
    }

    public static function getSubscribedEvents()
    {
        return [
            Events::PROJECT_CREATE => [['onProjectCreate', 255]],
            Events::PROJECT_DELETE => [['onProjectDelete', -255]],
            Events::PROJECT_PUSH => [['onProjectPush', -255]],
        ];
    }

    public function synchroRepository(&$project, &$repository)
    {
        $project->setRepository($repository);
        $project->setRepositorySize($repository->getSize());
        $dir = $project->getRepository()->getGitDir();

        $repositoryName = pathinfo($dir, PATHINFO_FILENAME).'.'.pathinfo($dir, PATHINFO_EXTENSION);
        $project->setRepositoryName($repositoryName);
    }

    public function onProjectCreate(ResourceEvent $event)
    {
        /** @var Project $project */
        $project = $event->getSubject();
        $project->setDefaultBranch(Project::DEFAULT_BRANCH);

        $path = $this->getPath($project);
        Admin::init($path);

        $repository = $this->getGitRepository($project);
        $this->synchroRepository($project, $repository);

        $this->domainManager->update($project);
    }

    public function onProjectUpdate()
    {
    }

    public function onProjectDelete($event)
    {
    }

    public function onProjectPush($event)
    {
    }

    /**
     * Computes the repository path for a given project.
     *
     * @return string
     */
    protected function getPath(Project $project)
    {
        return $this->repositoryPath.'/'.$project->getSlug().'.git';
    }

    public function getGitRepository(Project $project)
    {
        return new Repository($this->getPath($project), ['logger' => $this->logger]);
    }
}
