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

trait MemberTrait
{
    /**
     * @var array;
     */
    protected $members;


    /**
     * @var Team[]
     */
    protected $teams;

    /**
     * @return Team[]
     */
    public function getTeams()
    {
        $this->setMembers();
        return $this->teams;
    }

    /**
     * @param Team[] $teams
     * @return self
     */
    public function setTeams($teams)
    {
        $this->teams = $teams;
        $this->setMembers();

        return $this;
    }

    /**
     * @return array
     */
    public function getMembers()
    {
        return $this->members;
    }

    /**
     * @return $this
     */
    protected function setMembers()
    {
        foreach ($this->teams as $team) {
            foreach ($team->getMembers() as $member) {
                if (!isset($this->members[$member->getId()])) {
                    $this->members[$member->getId()] = $member->getUser();
                }
            }
        }

        return $this;
    }
}
