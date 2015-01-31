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
     * @var OrganizationUser[]
     */
    protected $organizationUsers;

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

    /**
     * @param User $user
     * @param string $role
     * @return $this
     */
    public function addUser(User $user, $role = 'ROLE_USER')
    {
        $this->organizationUsers[] = new OrganizationUser($user, $this, [$role]);
        return $this;
    }

    /**
     * @return OrganizationUser
     */
    public function getOrganizationUsers()
    {
        return $this->organizationUsers;
    }
}
