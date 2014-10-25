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
use FOS\RestBundle\View\View;
use Gitcolab\Bundle\AppBundle\Form\Type\ProjectType;
use Gitcolab\Bundle\AppBundle\Model\Project;

class ProjectController extends Controller
{
    public function createAction(Request $request)
    {
        $project = new Project();

        $form = $this->createForm(new ProjectType(), $project, array(
            'user_id' => $this->getUser()
        ));

        if ($form->handleRequest($request)->isValid()) {

            $this->persistAndFlush($project);
            $project->addUser($this->getUser(), 'ROLE_ADMIN');
            $this->persistAndFlush($project);

            $this->redirectToRoute($this->generateUrl('_welcome'));
        }

        $view = View::create();
        $view->setData(array(
            'form' => $form->createView()
        ));
        $view->setTemplate('GitcolabAppBundle:Project:create.html.twig');

        return $this->handleView($view);
    }

    public function showAction()
    {

    }
}
