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

class OrganizationUser
{
    /**
     * @var object
     */
    protected $organization;

    /**
     * @var object
     */
    protected $user;

    /**
     * @var string
     */
    protected $role;

    /**
     * @var \DateTime
     */
    protected $createdAt;

    /**
     * @param Organization $organization
     * @param User $user
     * @param string $role
     */
    public function __construct(Organization $organization, User $user, $role)
    {
        $this->organization = $organization;
        $this->user = $user;
        $this->role = $role;
        $this->createdAt = new \DateTime();
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
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param User $user
     * @return self
     */
    public function setUser(User $user)
    {
        $this->user = $user;
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
     * @param string $role
     * @return self
     */
    public function setRole($role)
    {
        $this->role = $role;
        return $this;
    }

    /**
     * @return string
     */
    public function getRole()
    {
        return $this->role;
    }
}
