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

use Symfony\Component\HttpFoundation\Request;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use Gitcolab\Bundle\AppBundle\Form\Type\OrganizationType;
use Gitcolab\Bundle\AppBundle\Model\Organization;

class OrganizationController extends Controller
{
    public function createAction(Request $request)
    {
        $organization = new Organization();

        $form = $this->createForm(new OrganizationType, $organization);

        if ($form->handleRequest($request)->isValid()) {
            $this->persistAndFlush($organization);

            $organization->addUser($this->getUser(), 'ROLE_ADMIN');
            $this->persistAndFlush($organization);

            return $this->redirectToRoute('dashboard');
        }

        return $this->render('GitcolabAppBundle:Organization:create.html.twig', array(
            'form' => $form->createView()
        ));
    }

    public function showAction(Request $request, $slug)
    {
        $orgaUser = $this->getRepository('User\User')->findOneBy(array('slug' => $slug));
        if ($orgaUser) {
            $response = $this->forward('GitcolabAppBundle:User:show', array(
                'slug'  => $slug,
            ));

            return $response;
        }

        $organization = $this->getRepository('Organization')->findOneBySlug($slug);
        $listQuery = $this->getRepository('Project')->getListPaginatorQueryBuilder($slug,'', array('name' => 'ASC'));
        $paginator = new Pagerfanta(new DoctrineORMAdapter($listQuery));
        $paginator
            ->setMaxPerPage(10)
            ->setCurrentPage($request->request->get('page', 1), false, true);

        return $this->render('GitcolabAppBundle:Organization:show.html.twig', array(
            'organization'  => $organization,
            'repositories' => $paginator
        ));
    }

    public function settingsAction(Organization $organization)
    {
        return $this->render('GitcolabAppBundle:Organization:settings.html.twig', array(
            'organization'  => $organization,
        ));
    }

}
