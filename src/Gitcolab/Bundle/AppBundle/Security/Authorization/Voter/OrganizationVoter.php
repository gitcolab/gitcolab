<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Security\Authorization\Voter;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\VoterInterface;
use Gitcolab\Bundle\AppBundle\Model\Organization;
use Gitcolab\Bundle\AppBundle\Model\Team;

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

            $role_hierarchy = array(
                Team::ACCESS_OWNER => [Team::ACCESS_READ, Team::ACCESS_WRITE],
                Team::ACCESS_WRITE => [Team::ACCESS_READ],
                Team::ACCESS_READ => [Team::ACCESS_READ]
            );

            foreach ($resource->getTeams() as $team ) {
                if ($team->hasMember($token->getUser()) && isset($rights[$attribute])) {

                    if(
                        $rights[$attribute] === $team->getAccess()
                        or in_array($rights[$attribute], $role_hierarchy[$team->getAccess()])
                    ) {
                      $granted++;
                    }

                }
            }

            if($attribute === VoterInterface::ACCESS_GRANTED) {
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
        $supportedClass = 'Gitcolab\Bundle\AppBundle\Model\OrganizationInterface';

        return $supportedClass === $class || is_subclass_of($class, $supportedClass);
    }
}
