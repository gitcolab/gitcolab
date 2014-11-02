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

class ProjectRepository extends EntityRepository
{
    public function findProject($org, $project)
    {
        $query = $this->createQueryBuilder('p')
            ->select('p, org')
            ->leftJoin('p.organization', 'org')
            ->where('p.slug = ?1')
            ->andWhere('org.slug = ?2')
            ->setParameter(1, $project)
            ->setParameter(2, $org)
            ->setMaxResults(1);

        return $query->getQuery()->getSingleResult();
    }

    public function findProjectsByUser($user)
    {
        $query = $this->queryProjectsByUser($user);
        return $query->getQuery()->getResult();
    }

    public function queryProjectsByUser($user)
    {
        $query = $this->createQueryBuilder('p')
            ->leftJoin('p.users', 'users')
            ->leftJoin('users.user', 'user')
            ->where('user.id  = ?1')
            ->setParameter(1, $user);

        return $query;
    }
}
