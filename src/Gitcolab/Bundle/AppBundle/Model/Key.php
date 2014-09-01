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

class Key
{
    protected $id;
    protected $key;
    protected $title;
    protected $user;
    protected $createdAt;
    protected $updatedAt;

    public function setKey($key)
    {
        $this->key = $key;
        return $this;
    }

    public function getKey()
    {
        return $this->key;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function setUser(User $user)
    {
        $this->user  =  $user;
        return $this;
    }

    public function getUser()
    {
        return $this->user;
    }
}