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

use Michelf\Markdown;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AppController extends Controller
{
    public function dashboardAction()
    {
        $organizations = $this->getRepository('Organization')->findOrganizationsByUser($this->getUser()->getId());
        $projects = $this->getRepository('Project')->findProjectsByUser($this->getUser()->getId());

        return $this->render('GitcolabAppBundle::dashboard.html.twig', [
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

        return $this->render('@GitcolabApp/App/preview.html.twig', ['text' => $text]);
    }
}
