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

use Gedmo\Timestampable\Traits\Timestampable;
use Sylius\Component\Resource\Model\ResourceInterface;

abstract class Owner implements ResourceInterface
{
    use Timestampable;

    /**
     * @var integer
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
     * @var Collection
     */
    protected $participations;

    /**
     * @var Collection
     */
    protected $issues;

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
     * @param string $slug
     * @return self
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;

        return $this;
    }

    /**
     * @return Project[]
     */
    public function getProjects()
    {
        return $this->projects;
    }

    /**
     * @param Project[] $projects
     * @return self
     */
    public function setProjects($projects)
    {
        $this->projects = $projects;

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
     * @param \DateTime $createdAt
     * @return self
     */
    public function setCreatedAt(\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;

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
     * @param \DateTime $updatedAt
     * @return self
     */
    public function setUpdatedAt(\DateTime $updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return Team[]
     */
    public function getTeams()
    {
        $this->setMembers();
        return $this->teams;
    }

    /**
     * @param Team[] $teams
     * @return self
     */
    public function setTeams($teams)
    {
        $this->teams = $teams;
        $this->setMembers();

        return $this;
    }

    /**
     * @return array
     */
    public function getMembers()
    {
        return $this->members;
    }

    protected function setMembers()
    {
        foreach ($this->teams as $team) {
            foreach ($team->getMembers() as $member) {
                if (!isset($this->members[$member->getId()])) {
                    $this->members[$member->getId()] = $member->getUser();
                }
            }
        }
    }

    /**
     * @return mixed
     */
    public function getParticipations()
    {
        return $this->participations;
    }

    /**
     * @param mixed $participations
     */
    public function setParticipations($participations)
    {
        $this->participations = $participations;
    }

    public function addParticipation($participation)
    {
        $this->participations[] = $participation;

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }
}
