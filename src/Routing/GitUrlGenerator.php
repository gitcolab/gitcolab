<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Routing;

use Doctrine\Common\Collections\Collection;
use Gitcolab\Repository\ProjectRepository;
use Gitonomy\Git\Repository;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * Implementation uses the slug.
 *
 * @author mlanawo mbechezi <mlanawo.mbechezi@ikimea.com>
 *
 * @since 1.0
 */
class GitUrlGenerator
{
    protected $projectRepository;

    /**
     * @var Collection
     */
    protected $storeProject;

    public function __construct(UrlGeneratorInterface $generator, array $routeNames, array $routeArgs, ProjectRepository $projectRepository)
    {
        parent::__construct($generator, $routeNames, $routeArgs);

        $this->projectRepository = $projectRepository;
    }

    /**
     * @return string
     */
    public function getName(Repository $repository)
    {
        $name = basename($repository->getPath());

        if (!isset($this->storeProject[$name])) {
            $project = $this->projectRepository->findOneBy([
                'repository' => $name,
            ]);
            $this->storeProject[$name] = $project;
        } else {
            $project = $this->storeProject[$name];
        }

        return $project->getFullSlug();
    }
}
