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

class Team
{
    use TimesheetTrait;
    use MemberTrait;

    const ACCESS_READ = 'ACCESS_READ';
    const ACCESS_WRITE = 'ACCESS_WRITE';
    const ACCESS_OWNER = 'ACCESS_OWNER';

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
    protected $access;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var Organization
     */
    protected $organization;

    /**
     * @var Project
     */
    protected $project;

    /**
     * @var User[]
     */
    protected $members;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTime();
        $this->members = new ArrayCollection();
    }

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
     * @param string $name
     *
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
     *
     * @return self
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    public function getAccess()
    {
        return $this->access;
    }

    /**
     * @param string $access
     *
     * @return self
     */
    public function setAccess($access)
    {
        $this->access = $access;

        return $this;
    }

    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     *
     * @return self
     */
    public function setDescription($description)
    {
        $this->description = $description;

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
     * @return self
     */
    public function setOrganization(Organization $organization)
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * @return Project
     */
    public function getProject()
    {
        return $this->project;
    }

    public function setProject(Project $project)
    {
        $this->project = $project;
    }

    /**
     * @param $type
     *
     * @return $this
     */
    public function addAccess($user, $type = Access::TYPE_COLLABORATOR)
    {
        $this->members[] = (new Access())
            ->setResource($this)
            ->setUser($user)
            ->setType($type);

        return $this;
    }

    /**
     * @param $user
     *
     * @return bool
     */
    public function hasMember($user)
    {
        foreach ($this->members as $member) {
            if ($member->getUser() === $user) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return ArrayCollection|User[]
     */
    public function getMembers()
    {
        return $this->members;
    }
}
