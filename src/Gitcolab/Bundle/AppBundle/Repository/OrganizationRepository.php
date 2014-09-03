<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

class OrganizationRepository extends EntityRepository
{
    public function findOrganizationsByUser($user)
    {
        $query = $this->createQueryBuilder('o')
            ->leftJoin('o.users', 'users')
            ->leftJoin('users.user', 'user')
            ->where('user.id  = ?1')
            ->setParameter(1, $user);

        return $query->getQuery()->getResult();
    }
}
