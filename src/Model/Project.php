<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Model;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Gitcolab\Git\Repository;

class Project
{
    use TimesheetTrait;

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
     * @var \DateTime
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
     * @var ArrayCollection
     */
    protected $members;

    /**
     * @var ArrayCollection
     */
    protected $pullRequests;

    /**
     * @var ArrayCollection
     */
    protected $issues;

    /**
     * @var ArrayCollection
     */
    protected $tickets;

    /**
     * @var ArrayCollection
     */
    protected $milestones;

    /**
     * @var Organization
     */
    private $owner;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTime();
        $this->pullRequests = new ArrayCollection();
        $this->issues = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param $name
     */
    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * @param $slug
     *
     * @return self
     */
    public function setSlug(string $slug)
    {
        $this->slug = $slug;

        return $this;
    }

    public function getFullSlug(): string
    {
        return $this->getOrganization()->getSlug().'/'.$this->getSlug();
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    /**
     * @param $description
     *
     * @return self
     */
    public function setDescription(string $description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return self
     */
    public function setLastActivity(\DateTimeInterface $lastActivity)
    {
        $this->lastActivity = $lastActivity;

        return $this;
    }

    public function getLastActivity(): \DateTime
    {
        return $this->lastActivity;
    }

    public function getDefaultBranch(): string
    {
        return $this->defaultBranch;
    }

    public function setDefaultBranch(string $defaultBranch): self
    {
        $this->defaultBranch = $defaultBranch;

        return $this;
    }

    public function setOrganization(Organization $organization): self
    {
        $this->owner = $organization;

        return $this;
    }

    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * @param $name
     *
     * @return $this
     */
    public function setRepositoryName($name)
    {
        $this->repository = $name;

        return $this;
    }

    /**
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

    public function getPullRequests(): Collection
    {
        return $this->pullRequests;
    }

    public function setPullRequests(Collection $pullRequests)
    {
        $this->pullRequests = $pullRequests;

        return $this;
    }

    public function getIssues(): Collection
    {
        return $this->tickets;
    }

    /**
     * @return ArrayCollection
     */
    public function getTickets(): Collection
    {
        return $this->tickets;
    }

    /**
     * @param ArrayCollection $tickets
     */
    public function setTickets(Collection $tickets)
    {
        $this->tickets = $tickets;
    }

    /**
     * @return ArrayCollection
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    /**
     * @param ArrayCollection $members
     */
    public function setMembers(Collection $members)
    {
        $this->members = $members;
    }

    public function __toString()
    {
        return $this->name;
    }
}
