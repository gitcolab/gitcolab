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

use Doctrine\ORM\Query\Expr\JOIN;
use Sylius\Bundle\ResourceBundle\Doctrine\ORM\EntityRepository;

class OrganizationRepository extends EntityRepository
{
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
