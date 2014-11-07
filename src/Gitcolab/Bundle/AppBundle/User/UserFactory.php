<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\User;

use Gitcolab\Bundle\AppBundle\Model\User\User;

class UserFactory
{
    public function createUser(array $data = [])
    {
        $user = new User();

        foreach ($data as $methodPart => $value) {
            $method = 'set' . ucfirst($methodPart);
            $user->$method($value);
        }
    }
}