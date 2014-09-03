<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;

use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\Query;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\DoctrineORMAdapter;

class Controller extends FOSRestController
{
    /**
     * Returns the paginator instance configured for the given query and page
     * number
     *
     * @param  Query   $query The query
     * @param  integer $page  The current page number
     * @param  integer $limit Results per page
     *
     * @return Pagerfanta
     */
    protected function getPaginator(Query $query, $page, $limit = 10)
    {
        $paginator = new Pagerfanta(new DoctrineORMAdapter($query));
        $paginator
            ->setMaxPerPage($limit)
            ->setCurrentPage($page, false, true)
        ;

        return $paginator;
    }

    /**
     * @param $class
     * @param string $domaine
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    protected function getRepository($class, $domaine = 'GitcolabAppBundle')
    {
        return $this->getDoctrine()->getRepository($domaine. ':'.$class);
    }

    /**
     * @param $entity
     * @param bool $flush
     */
    protected function persistAndFlush($entity, $flush = true)
    {
        $this->getDoctrine()->getManager()->persist($entity);

        if ($flush) {
            $this->getDoctrine()->getManager()->flush();
        }
    }

}