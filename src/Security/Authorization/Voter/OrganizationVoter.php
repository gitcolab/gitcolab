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

use Gitcolab\Model\Organization;
use Gitcolab\Model\Team;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;

class OrganizationVoter extends ResourceVoter
{
    /**
     * {@inheritdoc}
     */
    public function vote(TokenInterface $token, $resource, array $attributes)
    {
        if ($resource instanceof Organization) {
            $attribute = parent::vote($token, $resource, $attributes);
            $granted = 0;

            $rights = [
                'view' => Team::ACCESS_READ,
                'update' => Team::ACCESS_WRITE,
                'manage' => Team::ACCESS_OWNER,
            ];

            $role_hierarchy = [
                Team::ACCESS_OWNER => [Team::ACCESS_READ, Team::ACCESS_WRITE],
                Team::ACCESS_WRITE => [Team::ACCESS_READ],
                Team::ACCESS_READ => [Team::ACCESS_READ],
            ];

            foreach ($resource->getTeams() as $team) {
                if ($team->hasMember($token->getUser()) && isset($rights[$attribute])) {
                    if (
                        $rights[$attribute] === $team->getAccess()
                        or \in_array($rights[$attribute], $role_hierarchy[$team->getAccess()], true)
                    ) {
                        ++$granted;
                    }
                }
            }

            if (VoterInterface::ACCESS_GRANTED === $attribute) {
                return VoterInterface::ACCESS_GRANTED;
            }

            if ($granted > 0) {
                return VoterInterface::ACCESS_GRANTED;
            }
        }

        return VoterInterface::ACCESS_ABSTAIN;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsClass($class)
    {
        $supportedClass = Organization::class;

        return $supportedClass === $class || is_subclass_of($class, $supportedClass);
    }
}
