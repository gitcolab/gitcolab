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
use Gitcolab\Bundle\AppBundle\GitcolabEvents;
use Gitcolab\Bundle\AppBundle\Event\ProjectEvent;

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

            $this->dispatch(GitcolabEvents::PROJECT_CREATE, new ProjectEvent($project, $this->getUser()));

            return $this->redirectToRoute('_welcome');
        }

        $view = View::create();
        $view->setData(array(
            'form' => $form->createView()
        ));
        $view->setTemplate('GitcolabAppBundle:Project:create.html.twig');

        return $this->handleView($view);
    }

    public function showAction(Request $request, $slug)
    {
        $slugParameter = explode('/', $slug);
        $project = $this->getRepository('Project')->findProject($slugParameter[0], $slugParameter[1]);

        if (!$project) {
            throw $this->createNotFoundException();
        }

        $view = View::create();
        $view->setData(array(
            'project' => $project,
            'slug' => $slug,
            'gitcolab_url' => str_replace('http://', '', $this->container->getParameter('gitcolab.url'))
        ));
        $view->setTemplate('GitcolabAppBundle:Project:show.html.twig');

        return $this->handleView($view);
    }
}
