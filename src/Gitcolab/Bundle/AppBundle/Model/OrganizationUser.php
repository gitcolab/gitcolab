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
     * @param $role
     */
    public function __construct(Organization $organization, User $user, $role)
    {
        $this->organization;
        $this->user;
        $this->role = $role;
        $this->createdAt = new \DateTime();
    }

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
     * @param $user
     * @return $this
     */
    public function setUser($user)
    {
        $this->user = $user;
        return $this;
    }

    /**
     * @return objects
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param $role
     * @return $this
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
