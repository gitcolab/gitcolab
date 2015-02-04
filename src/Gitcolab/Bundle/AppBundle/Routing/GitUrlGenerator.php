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
 * @since 1.0
 */
class GitUrlGenerator extends BaseGitUrlGenerator
{
    /**
     * @var RegistryInterface
     */
    protected $register;

    /**
     * @var Collection
     */
    protected $storeProject;

    public function __construct(UrlGeneratorInterface $generator, array $routeNames = array(), array $routeArgs = array(), RegistryInterface $register)
    {
        parent::__construct($generator, $routeNames, $routeArgs);

        $this->register = $register;
    }

    /**
     * @param Repository $repository
     * @return string
     */
    public function getName(Repository $repository)
    {
        $name = basename($repository->getPath());

        if (!isset($this->storeProject[$name])) {

            $project = $this->register->getRepository('GitcolabAppBundle:Project')->findOneBy(array(
                'repository' => $name
            ));
            $this->storeProject[$name] = $project;

        } else {
            $project = $this->storeProject[$name];
        }

        return $project->getFullSlug();
    }

}