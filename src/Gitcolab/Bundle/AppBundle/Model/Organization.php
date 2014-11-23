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

class Organization extends Owner
{
    /**
     *
     * @var integer
     */
    protected $id;

    /**
     *
     * @var string
     */
    protected $email;

    /**
     *
     * @var object
     */
    protected $createdAt;

    /**
     *
     * @var object
     */
    protected $updatedAt;

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
     * @var object
     */
    protected $projects;

    /**
     *
     * @var object
     */
    protected $users;

    /**
     * @param $email
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
     * @param $projects
     * @return $this
     */
    public function setProjects($projects)
    {
        $this->projects = $projects;

        return $this;
    }

    /**
     * @return object
     */
    public function getProjects()
    {
        return $this->projects;
    }

    /**
     * @param $user
     * @param string $role
     * @return $this
     */
    public function addUser($user, $role = 'ROLE_USER')
    {
        $this->users[] = new OrganizationUser($this, $user, $role);
        return $this;
    }

    /**
     * @param $users
     * @return $this
     */
    public function setUsers($users)
    {
        $this->users = $users;
        return $this;
    }

    /**
     * @return object
     */
    public function getUsers()
    {
        return $this->users;
    }
}
