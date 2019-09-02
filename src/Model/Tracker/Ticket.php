<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Model\Tracker;

use Gitcolab\Model\User;

abstract class Ticket
{
    const OPENED = 'opened';
    const CLOSED = 'closed';

    /**
     * @var integer;
     */
    protected $id;

    /**
     * @var integer;
     */
    protected $number;

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
    protected $participations;

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
     * @return int
     */
    public function getNumber()
    {
        return $this->number;
    }

    /**
     * @param int $number
     */
    public function setNumber($number)
    {
        $this->number = $number;
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
    public function getDeletedAt()
    {
        return $this->deletedAt;
    }

    /**
     * @param  \DateTimeInterface $deletedAt
     * @return self;
     */
    public function setDeletedAt(\DateTimeInterface $deletedAt)
    {
        $this->deletedAt = $deletedAt;

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
    public function getParticipations()
    {
        return $this->participations;
    }

    /**
     * @param User $participant
     */
    public function addParticipant(User $participant)
    {
        $this->participations[] = $participant;
    }

    /**
     * @param  Collection $participations
     * @return self
     */
    public function setParticipations($participations)
    {
        $this->participations = $participations;

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
     * @param User $subscription
     * @return self
     */
    public function addSubscription(User $subscription)
    {
        if ($this->subscriptions->contains($subscription)) {
            $this->subscriptions[] = $subscription;
        }

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
