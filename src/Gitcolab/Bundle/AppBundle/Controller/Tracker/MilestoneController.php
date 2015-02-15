<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Controller\Tracker;

use Gitcolab\Bundle\AppBundle\Controller\Controller;
use Gitcolab\Bundle\AppBundle\Form\Type\MilestoneType;
use Gitcolab\Bundle\AppBundle\Model\Tracker\Milestone;
use Symfony\Component\HttpFoundation\Request;

class MilestoneController extends Controller
{
    public function indexAction($slug)
    {
        $project = $this->getProject($slug);
        $milestones = $this->getRepository('Tracker\Milestone')->findBy(['project' => $project]);

        return $this->render('GitcolabAppBundle:Milestone:index.html.twig' , array(
            'project' => $project,
            'milestones' => $milestones
        ));
    }

    public function createAction(Request $request, $slug)
    {
        $project = $this->getProject($slug);
        $milestone = (new Milestone())
            ->setProject($project)
        ;
        $form = $this->createForm(new MilestoneType(), $milestone);

        if ($form->handleRequest($request)->isValid()) {

            $this->persistAndFlush($milestone);

            $this->get('session')->getFlashBag()->add(
                'notice',
                'Milestone created!'
            );

            return $this->redirect($this->generateUrl('milestone_show', ['slug' => $milestone->getSlug()]));
        }

        return $this->render('@GitcolabApp/Milestone/create.html.twig', [
            'project' => $project,
            'form' => $form->createView()
        ]);
    }

    /**
     * @param $slug
     * @return mixed
     */
    public function getProject($slug)
    {
        $slugParameter = explode('/', $slug);
        $project = $this->getRepository('Project')->findProject($slugParameter[0], $slugParameter[1]);

        return $project;
    }
}
