<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Gitcolab\Model\Organization;
use Doctrine\Common\Persistence\ManagerRegistry;

class OrganizationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Organization::class);
    }

    public function findOrganizationsByUser($user)
    {
        $query = $this->queryOrganizationsByUser($user);
        return $query->getQuery()->getResult();
    }

    public function queryOrganizationsByUser($user)
    {
        $qb = $this->createQueryBuilder('o');
        $query = $qb
            ->leftJoin('o.members', 'access')
            ->where('access.user = :user')
            ->setParameter('user', $user)
        ;

        return $query;
    }
}
