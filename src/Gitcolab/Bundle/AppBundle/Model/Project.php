<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Model;

use Gitcolab\Bundle\AppBundle\Git\Repository;

class Project
{
    const SLUG_PATTERN = "[\w\/]+";
    const DEFAULT_BRANCH = 'master';

    /**
     * @var int
     */
    protected $id;

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $slug;

    /**
     * @var string
     */
    protected $description;

    /**
     *
     * @var object
     */
    protected $createdAt;

    /**
     *
     * @var object
     */
    protected $updatedAt;

    /**
     *
     * @var object
     */
    protected $lastActivity;

    /**
     * @var object
     */
    protected $repository;

    /**
     * @var string
     */
    protected $path;

    /**
     * @var object
     */
    protected $organization;

    /**
     * @var string
     */
    protected $defaultBranch;

    /**
     * @var int
     */
    protected $repositorySize;

    /**
     * @var Team[]
     */
    protected $teams;

    /**
     * @var  Collection
     */
    protected $members;

    /**
     * @var Owner
     */
    protected $owner;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param $name
     * @return self
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return string
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * @param $slug
     * @return self
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    public function getFullSlug()
    {
        return $this->getOrganization()->getSlug() .'/'. $this->getSlug();
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param $description
     * @return self
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @param \DateTime $created
     * @return self
     */
    public function setCreatedAt(\DateTime $created)
    {
        $this->createdAt = $created;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $updated
     * @return self
     */
    public function setUpdatedAt(\DateTime $updated)
    {
        $this->updatedAt = $updated;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param \DateTime $lastActivity
     * @return self
     */
    public function setLastActivity(\DateTime $lastActivity)
    {
        $this->lastActivity = $lastActivity;
        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getLastActivity()
    {
        return $this->lastActivity;
    }

    /**
     * @return string
     */
    public function getDefaultBranch()
    {
        return $this->defaultBranch;
    }

    /**
     * @param string $defaultBranch
     * @return self
     */
    public function setDefaultBranch($defaultBranch)
    {
        $this->defaultBranch = $defaultBranch;

        return $this;
    }

    public function setOrganization(Organization $organization)
    {
        $this->owner = $organization;
        return $this;
    }

    public function getOrganization()
    {
        return $this->owner;
    }

    /**
     * @param $name
     * @return $this
     */
    public function setRepositoryName($name)
    {
        $this->repository = $name;

        return $this;
    }

    /**
     * @param Repository $repository
     * @return self
     */
    public function setRepository(Repository $repository)
    {
        $this->repository = $repository;
        return $this;
    }

    public function getRepository()
    {
        return $this->repository;
    }


    public function getRepositorySize()
    {
        return $this->repositorySize;
    }

    public function setRepositorySize($repositorySize)
    {
        $this->repositorySize = $repositorySize;

        return $this;
    }

    public function getUsers()
    {
        return [];
    }

    public function __toString()
    {
        return $this->name;
    }
}
