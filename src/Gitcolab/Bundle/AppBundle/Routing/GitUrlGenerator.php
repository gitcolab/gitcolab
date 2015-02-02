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
use Gitonomy\Bundle\GitBundle\Routing\GitUrlGenerator as BaseGitUrlGenerator;
use Gitonomy\Git\Repository;

class GitUrlGenerator extends BaseGitUrlGenerator
{
    protected $entityManager;
    protected $_storeProject;

    public function setEntityManager($entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getName(Repository $repository)
    {
        $name = basename($repository->getPath());

        if (!isset($this->_storeProject[$name])) {

            $project = $this->entityManager->getRepository('GitcolabAppBundle:Project')->findOneBy(array(
                'repository' => $name
            ));

            $this->_storeProject[$name] = $project;
        } else {
            $project = $this->_storeProject[$name];
        }

        return $project->getFullSlug();


        if (preg_match('/^(.*)\.git$/', $name, $vars)) {
            return $vars[1];
        }

        return $name;
    }

}