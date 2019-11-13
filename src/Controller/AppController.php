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

use Gitcolab\Repository\OrganizationRepository;
use Gitcolab\Repository\ProjectRepository;
use Michelf\Markdown;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class AppController extends AbstractController
{
    public function dashboardAction(OrganizationRepository $organizationRepository, ProjectRepository $projectRepository)
    {
        $organizations = $organizationRepository->findOrganizationsByUser($this->getUser()->getId());
        $projects = $projectRepository->findProjectsByUser($this->getUser()->getId());

        return $this->render('dasboard.html.twig', [
            'organizations' => $organizations,
            'projects' => $projects,
        ]);
    }

    public function previewAction(Request $request)
    {
        $text = $request->request->get('text');

        if (null !== $text) {
            $text = Markdown::defaultTransform($text);
        }

        return $this->render('App/preview.html.twig', ['text' => $text]);
    }
}
