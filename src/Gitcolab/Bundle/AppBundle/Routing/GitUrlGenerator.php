<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Routing;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Gitonomy\Bundle\GitBundle\Routing\GitUrlGenerator as BaseGitUrlGenerator;
use Gitonomy\Git\Repository;

/**
 * Implementation uses the slug.
 *
 * @author mlanawo mbechezi <mlanawo.mbechezi@ikimea.com>
 */
class GitUrlGenerator extends BaseGitUrlGenerator
{
    /**
     * @var EntityManagerInterface
     */
    protected $entityManager;

    /**
     * @var Collection
     */
    protected $storeProject;

    /**
     * @param RegistryInterface $entityManager
     */
    public function setEntityManager(RegistryInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @param Repository $repository
     * @return string
     */
    public function getName(Repository $repository)
    {
        $name = basename($repository->getPath());

        if (!isset($this->_storeProject[$name])) {

            $project = $this->entityManager->getRepository('GitcolabAppBundle:Project')->findOneBy(array(
                'repository' => $name
            ));

            $this->storeProject[$name] = $project;
        } else {
            $project = $this->_storeProject[$name];
        }

        return $project->getFullSlug();
    }

}