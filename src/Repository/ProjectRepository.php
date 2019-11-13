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
use Doctrine\Common\Persistence\ManagerRegistry;
use Gitcolab\Model\Project;

class ProjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Project::class);
    }

    /**
     * {@inheritdoc}
     */
    public function findOneBy(array $criteria, ?array $orderBy = null)
    {
        if (isset($criteria['slug']) && true === strpos($criteria['slug'], '/')) {
            $slugParameter = explode('/', $criteria['slug']);

            return $this->findProject($slugParameter[0], $slugParameter[1]);
        }

        return parent::findOneBy($criteria);
    }

    public function findProject($organization, $project)
    {
        $query = $this->createQueryBuilder('project')
            ->select('project, organization')
            ->leftJoin('project.organization', 'organization')
            ->leftJoin('organization.teams', 'team')
            ->leftJoin('team.members', 'access')
            ->andWhere('project.slug = ?1')
            ->andWhere('organization.slug = ?2')
            ->setParameters([1 => $project, 2 => $organization])
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
        $qb = $this->createQueryBuilder('project');
        $query = $qb
            ->select('project, organization')
            ->leftJoin('project.organization', 'organization')
            ->leftJoin('organization.teams', 'team')
            ->leftJoin('team.members', 'access')
            ->where('access.user = :user')
            ->setParameter('user', $user)
        ;

        return $query;
    }

    /**
     * @param string $search
     *
     * @return QueryBuilder
     */
    public function getListPaginatorQueryBuilder($org, $search = '', array $orderBy = [])
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
