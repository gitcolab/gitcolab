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

use Sylius\Component\Resource\Model\ResourceInterface;
use Gitcolab\Bundle\AppBundle\Model\User\OrganizationUser;
use Gitcolab\Bundle\AppBundle\Model\User\User;

class Organization extends Owner
{
    /**
     * @var string
     */
    protected $email;

    /**
     * @var object
     */
    protected $lastActivity;

    /**
     *
     * @var string
     */
    protected $avatar;

    /**
     *
     * @var array
     */
    protected $members;

    /**
     * @param string $email
     * @return $this
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return object
     */
    public function getLastActivity()
    {
        return $this->lastActivity;
    }

    /**
     * @param object $lastActivity
     * @return self
     */
    public function setLastActivity($lastActivity)
    {
        $this->lastActivity = $lastActivity;

        return $this;
    }

    /**
     * @param string $avatar
     * @return self
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;

        return $this;
    }

    /**
     * @return string
     */
    public function getAvatar()
    {
        return $this->avatar;
    }
}
