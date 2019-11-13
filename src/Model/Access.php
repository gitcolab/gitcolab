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

class Access
{
    use TimesheetTrait;

    const TYPE_COLLABORATOR = 'type_collaborator';
    const TYPE_OWNER = 'type_owner';

    /**
     * @var string
     *
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @var object
     */
    protected $resource;

    /**
     * @var User
     */
    protected $user;

    /**
     * @var string
     */
    protected $type;

    /**
     * @var string
     */
    protected $options;

    /**
     * @var Organization
     */
    protected $organization;

    /**
     * @var Project
     */
    protected $project;

    /**
     * @var Team
     */
    protected $team;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->options = [];
    }

    /**
     * @return int
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return object
     */
    public function getResource()
    {
        return $this->resource;
    }

    /**
     * @param object $resource
     *
     * @throws \ReflectionException
     *
     * @return $this
     */
    public function setResource($resource)
    {
        $className = (new \ReflectionClass($resource))->getShortName();
        $this->{'set'.$className}($resource);
        $this->resource = $className;

        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @return $this
     */
    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getOrganization(): Organization
    {
        return $this->organization;
    }

    public function setOrganization(Organization $organization): self
    {
        $this->organization = $organization;

        return $this;
    }

    public function setProject(Project $project): self
    {
        $this->project = $project;

        return $this;
    }

    public function getProject(): Project
    {
        return $this->project;
    }

    /**
     * @param Team $team
     */
    public function setTeam(Team $team = null): self
    {
        $this->team = $team;

        return $this;
    }

    public function getTeam(): Team
    {
        return $this->team;
    }
}
