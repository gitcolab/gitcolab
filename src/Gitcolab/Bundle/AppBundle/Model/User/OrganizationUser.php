<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Model\User;
use Gitcolab\Bundle\AppBundle\Model\Organization;

/**
 * UserOrganization class is a ManyToMany relation with parameter on the association
 * which is an array of rights.
 */
class OrganizationUser
{
    /**
     * @var User
     */
    private $user;

    /**
     * @var Organization
     */
    private $organization;

    /**
     * @var array
     */
    private $roles;

    public function __construct(User $user, Organization $organization, array $roles = [])
    {
        $this->user = $user;
        $this->organization = $organization;
        $this->roles = $roles;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return Organization
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * @return array
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @param array $roles
     * @return self
     */
    public function setRoles(array $roles)
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * @param string $role
     * @return self
     */
    public function addRole($role)
    {
        $this->roles[] = $role;
        return $this;
    }
}
