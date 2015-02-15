<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Model\Tracker;

use Gitcolab\Bundle\AppBundle\Model\User\User;

abstract class Tracker
{
    /**
     * @var integer;
     */
    protected $id;

    /**
     * @var string;
     */
    protected $name;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * @var \DateTime
     */
    protected $updatedAt;

    /**
     * @var \DateTime
     */
    protected $deletedAt;

    /**
     * @var Project
     */
    protected $project;

    /**
     * @var User/User
     */
    protected $author;

    /**
     * @var string
     */
    protected $state;

    /**
     * @var User
     */
    protected $assignee;

    /**
     * @var Collection
     */
    protected $participants;

    /**
     * @var Collection
     */
    protected $subscriptions;

    /**
     * @var Milestone
     */
    protected $milestone;

    /**
     * @var Collection
     */
    protected $votes;

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
     * @param  string $name
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
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param  string $description
     * @return self;
     */
    public function setDescription($description)
    {
        $this->description = $description;

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
     * @param  \DateTimeInterface $createdAt
     * @return self;
     */
    public function setCreatedAt(\DateTimeInterface $createdAt)
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
     * @param  \DateTimeInterface $updatedAt
     * @return self;
     */
    public function setUpdatedAt(\DateTimeInterface $updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * @return \DateTime
     */
    public function getDeteleteAt()
    {
        return $this->deteleteAt;
    }

    /**
     * @param  \DateTimeInterface $deteleteAt
     * @return self;
     */
    public function setDeteleteAt(\DateTimeInterface $deteleteAt)
    {
        $this->deteleteAt = $deteleteAt;

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
     * @param  Project $project
     * @return self;
     */
    public function setProject($project)
    {
        $this->project = $project;

        return $this;
    }

    /**
     * @return User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param  User  $author
     * @return self;
     */
    public function setAuthor($author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param  string $state
     * @return self;
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * @return User
     *
     */
    public function getAssignee()
    {
        return $this->assignee;
    }

    /**
     * @param  User $assignee
     * @return self
     */
    public function setAssignee($assignee)
    {
        $this->assignee = $assignee;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getMilestone()
    {
        return $this->milestone;
    }

    /**
     * @param  Milestone $milestone
     * @return self
     */
    public function setMilestone(Milestone $milestone)
    {
        $this->milestone = $milestone;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getParticipants()
    {
        return $this->participants;
    }

    /**
     * @param User $participant
     */
    public function addParticipant(User $participant)
    {
        $this->participants[] = $participant;
    }

    /**
     * @param  Collection $participants
     * @return self
     */
    public function setParticipants($participants)
    {
        $this->participants = $participants;

        return $this;
    }

    /**
     * @return Collection
     */
    public function getSubscriptions()
    {
        return $this->subscriptions;
    }

    /**
     * @param  User $subscription
     * @return self
     */
    public function addSubscription(User $subscription)
    {
        $this->subscriptions[] = $subscription;

        return $this;
    }

    /**
     * @param  Collection $subscriptions
     * @return self
     */
    public function setSubscriptions($subscriptions)
    {
        $this->subscriptions = $subscriptions;

        return $this;
    }
}
