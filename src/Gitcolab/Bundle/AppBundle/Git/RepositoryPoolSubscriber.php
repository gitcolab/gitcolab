<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Git;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;

use Gitonomy\Git\Admin;
use Sylius\Component\Resource\Event\ResourceEvent;
use Gitcolab\Bundle\AppBundle\GitcolabEvents;
use Gitcolab\Bundle\AppBundle\Model\Project;

class RepositoryPoolSubscriber implements EventSubscriberInterface
{
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
    public function __construct($repositoryPath)
    {
        $this->repositoryPath = $repositoryPath;
    }

    public static function getSubscribedEvents()
    {
        return array(
            GitcolabEvents::PROJECT_CREATE => array(array('onProjectCreate', 255)),
            'gitcolab.project.post_create' => array(array('onProjectCreate', 255)),
            GitcolabEvents::PROJECT_DELETE => array(array('onProjectDelete', -255)),
            GitcolabEvents::PROJECT_PUSH   => array(array('onProjectPush', -255))
        );
    }

    public function onProjectCreate($event)
    {
        if ($event instanceof ResourceEvent) {
            $project = $event->getSubject();
        } else {
            $project = $event->getProject();
        }

        $path = $this->getPath($project);

        Admin::init($path);

        $repository = $this->getGitRepository($project);

        $project->setRepository($repository);
        $project->setRepositorySize($repository->getSize());
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
     * @param Project $project
     * @return string
     */
    protected function getPath(Project $project)
    {
        return $this->repositoryPath.'/'.$project->getSlug().'.git';
    }

    public function getGitRepository(Project $project)
    {
        return new Repository($this->getPath($project));
    }
}
