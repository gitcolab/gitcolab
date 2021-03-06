<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Model;

use Gitcolab\Model\Access;

trait MemberTrait
{
    /**
     * @param $user
     * @param $type
     * @return $this
     */
    public function addAccess($user, $type = Access::TYPE_COLLABORATOR)
    {
        $this->members[] = (new Access())
            ->setResource($this)
            ->setUser($user)
            ->setType($type);

        return $this;
    }
}
