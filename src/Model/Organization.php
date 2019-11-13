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

class Organization
{
    use MemberTrait;
    use TimesheetTrait;

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
     * @var Project[]
     */
    protected $projects;

    /**
     * @var Team[]
     */
    protected $teams;

    /**
     * @var array
     */
    protected $members;

    /**
     * @var string
     */
    protected $email;

    /**
     * @var object
     */
    protected $lastActivity;

    /**
     * @var string
     */
    protected $avatar;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTime();
    }

    /**
     * @return int
     */
    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @return self
     */
    public function setName(string $name)
    {
        $this->name = $name;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    /**
     * @return self
     */
    public function setSlug(string $slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return $this
     */
    public function setEmail(string $email)
    {
        $this->email = $email;

        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getLastActivity(): object
    {
        return $this->lastActivity;
    }

    /**
     * @return self
     */
    public function setLastActivity(object $lastActivity)
    {
        $this->lastActivity = $lastActivity;

        return $this;
    }

    /**
     * @return self
     */
    public function setAvatar(string $avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    public function getAvatar(): string
    {
        return $this->avatar;
    }

    /**
     * @return Project[]|ArrayCollection
     */
    public function getProjects()
    {
        return $this->projects;
    }

    /**
     * @param Project[] $projects
     *
     * @return self
     */
    public function setProjects(Collection $projects)
    {
        $this->projects = $projects;

        return $this;
    }

    /**
     * @return Team[]
     */
    public function getTeams(): Collection
    {
        return $this->teams;
    }

    public function addTeam(Team $team)
    {
        $this->teams[] = $team;

        return $this;
    }

    /**
     * @param Team[] $teams
     *
     * @return self
     */
    public function setTeams(Collection $teams)
    {
        $this->teams = $teams;

        return $this;
    }

    /**
     * @return array
     */
    public function getMembers(): Collection
    {
        foreach ($this->teams as $team) {
            foreach ($team->getMembers() as $member) {
                if (!isset($this->members[$member->getId()])) {
                    $this->members[$member->getId()] = $member;
                }
            }
        }

        return $this->members;
    }

    public function __toString()
    {
        return $this->name;
    }
}
