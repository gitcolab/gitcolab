<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Security\Authorization\Voter;

use Gitcolab\Model\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

class ResourceVoter implements VoterInterface
{
    const VIEW = 'view';
    const EDIT = 'edit';
    const DELETE = 'delete';
    const ASSIGN = 'assign';
    const DELETE_ASSIGN = 'delete_assign';

    /**
     * {@inheritdoc}
     */
    public function supportsAttribute($attribute)
    {
        return \in_array($attribute, [
            self::VIEW,
            self::EDIT,
            self::DELETE,
            self::ASSIGN,
            self::DELETE_ASSIGN,
        ], true);
    }

    /**
     * {@inheritdoc}
     */
    public function vote(TokenInterface $token, $resource, array $attributes)
    {
        // get current logged in user
        $user = $token->getUser();

        // make sure there is a user object (i.e. that the user is logged in)
        if (!$user instanceof User) {
            return VoterInterface::ACCESS_DENIED;
        }

        if ($user->hasRole('ROLE_ADMIN') || $user->hasRole('ROLE_SUPER_ADMIN')) {
            return VoterInterface::ACCESS_GRANTED;
        }

        return strtolower($attributes[0]);
    }

    public function supportsClass($class)
    {
    }
}
