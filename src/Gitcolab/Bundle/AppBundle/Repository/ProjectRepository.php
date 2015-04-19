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

use Sylius\Bundle\ResourceBundle\Doctrine\ORM\EntityRepository;

class ProjectRepository extends EntityRepository
{
    /**
     * {@inheritdoc}
     */
    public function findOneBy(array $criteria)
    {
        if (isset($criteria['slug']) && strpos($criteria['slug'], '/') == true) {
            $slugParameter = explode('/', $criteria['slug']);
            return $this->findProject($slugParameter[0], $slugParameter[1]);
        }

        return parent::findOneBy($criteria);
    }


    public function findProject($org, $project)
    {
        $query = $this->createQueryBuilder('p')
            ->select('p, org')
            ->leftJoin('p.owner', 'org')
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
        $qb = $this->createQueryBuilder('p');
        $query = $qb
            ->leftJoin('p.owner', 'owner')
            ->where($qb->expr()->eq('owner', ':user'))
            ->setParameter('user', $user)
        ;

        return $query;
    }

    /**
     * @param string $search
     * @param array $orderBy
     * @return QueryBuilder
     */
    public function getListPaginatorQueryBuilder($org, $search = '', array $orderBy = array())
    {
        $qb = $this->createQueryBuilder('p')
            ->leftJoin('p.owner', 'org');

        if ('' !== $search) {
            foreach ($this->_class->getFieldNames() as $fieldName) {
                $qb->orWhere(sprintf('p.%s LIKE :search', $fieldName));
            }
            $qb->setParameter(':search', '%'.$search.'%');
        }

        foreach ($orderBy as $field => $order) {
            $qb->addOrderBy('p.'.$field, $order);
        }

        $qb->andWhere('org.slug = ?2')
           ->setParameter(2, $org);


        return $qb;
    }
}
