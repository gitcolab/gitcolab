<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Controller;

use Gitcolab\DomainManager;
use Gitcolab\Repository\OrganizationRepository;
use Gitcolab\Repository\ProjectRepository;
use Gitcolab\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use Gitcolab\Form\Type\OrganizationType;
use Gitcolab\Model\Organization;

class OrganizationController extends AbstractController
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function createAction(Request $request)
    {
        $organization = new Organization();

        $form = $this->createForm(OrganizationType::class, $organization);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->handleRequest($request)->isValid()) {
            $this->get(DomainManager::class)->create($organization);
            return $this->redirectToRoute('dashboard');
        }

        return $this->render('Organization/create.html.twig', array(
            'form' => $form->createView()
        ));
    }

    public function showAction(
        Request $request,
        $slug,
        UserRepository $userRepository,
        ProjectRepository $projectRepository,
        OrganizationRepository $organizationRepository
    )
    {
        $orgaUser = $userRepository->findOneBy(array('slug' => $slug));

        if ($orgaUser) {
            return $this->forward('GitcolabAppBundle:User:show', array(
                'slug'  => $slug,
            ));
        }

        $organization = $organizationRepository->findOneBySlug($slug);
        if (!$organization) {
            throw $this->createNotFoundException();
        }

        $listQuery = $projectRepository->getListPaginatorQueryBuilder($slug,'', array('name' => 'ASC'));
        $paginator = new Pagerfanta(new DoctrineORMAdapter($listQuery));
        $paginator
            ->setMaxPerPage(10)
            ->setCurrentPage($request->request->get('page', 1), false, true);

        return $this->render('Organization/show.html.twig', array(
            'organization'  => $organization,
            'repositories' => $paginator
        ));
    }

    public function settingsAction(Organization $organization)
    {
        return $this->render('Organization/settings.html.twig', array(
            'organization'  => $organization,
        ));
    }

}
