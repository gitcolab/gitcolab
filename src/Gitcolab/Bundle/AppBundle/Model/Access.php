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

use Gitcolab\Bundle\AppBundle\Model\User\User;
use Sylius\Component\Resource\Model\ResourceInterface;

class Access implements ResourceInterface
{
    use TimesheetTrait;

    const TYPE_COLLABORATOR = 'type_collaborator';
    const TYPE_OWNER = 'type_owner';

    /**
     * @var int
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
     * @var Organization
     */
    protected $organization;

    /**
     * @var string
     */
    protected $type;

    /**
     * @var string
     */
    protected $options;

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
        $this->options = [];
    }

    /**
     * @return int
     */
    public function getId()
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
     * @return $this
     */
    public function setResource($resource)
    {
        $className = (new \ReflectionClass($resource))->getShortName();
        $this->{'set'.$className}($resource);
        $this->resource = $className;

        return $this;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     * @return $this
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     * @return self
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return Organization
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * @param  Organization $organization
     * @return self
     */
    public function setOrganization(Organization $organization)
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * @param  Project $project
     * @return self
     */
    public function setProject(Project $project)
    {
        $this->project = $project;

        return $this;
    }

    /**
     * @return Project
     */
    public function getProject()
    {
        return $this->project;
    }

    /**
     * @param Team $team
     * @return self
     */
    public function setTeam(Team $team = null)
    {
        $this->team = $team;

        return $this;
    }

    /**
     * @return Team
     */
    public function getRoom()
    {
        return $this->team;
    }
}
