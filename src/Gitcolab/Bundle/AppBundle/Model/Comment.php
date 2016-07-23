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

use Gitcolab\Bundle\AppBundle\Model\Tracker\Ticket;
use Gitcolab\Bundle\AppBundle\Model\User\User;
use Sylius\Component\Resource\Model\ResourceInterface;

class Comment implements ResourceInterface
{
    use TimesheetTrait;

    /**
     * @var int
     */
    protected $id;

    /**
     * @var User
     */
    protected $author;

    protected $ticket;

    /**
     * @var string
     */
    protected $message;


    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
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
     * @return Comment
     */
    public function setAuthor(User $author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getTicket()
    {
        return $this->ticket;
    }

    /**
     * @param Ticket $ticket
     * @return Comment
     */
    public function setTicket(Ticket $ticket)
    {
        $this->ticket = $ticket;

        return $this;
    }

    /**
     * @return string
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param string $message
     * @return Comment
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }
}
