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

class Vote
{
    /**
     * @var integer
     */
    protected $id;

    /**
     * @var Object
     */
    protected $ticket;

    /**
     * @var string
     */
    protected $vote;

    /**
     * @var User
     */
    protected $author;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Object
     */
    public function getTicket()
    {
        return $this->ticket;
    }

    /**
     * @param Ticket $ticket
     */
    public function setTicket(Ticket $ticket)
    {
        $this->ticket = $ticket;
    }

    /**
     * @return string
     */
    public function getVote()
    {
        return $this->vote;
    }

    /**
     * @param string $vote
     */
    public function setVote($vote)
    {
        $this->vote = $vote;
    }

    /**
     * @return User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param User $author
     * @return self
     */
    public function setAuthor(User $author)
    {
        $this->author = $author;

        return $this;
    }
}
