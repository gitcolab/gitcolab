<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Controller\Tracker;

use Gitcolab\DomainManager;
use Gitcolab\Form\Type\MilestoneType;
use Gitcolab\Model\Tracker\Milestone;
use Gitcolab\Model\Project;
use Gitcolab\Repository\MilestoneRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class MilestoneController extends AbstractController
{
    public function indexAction(Project $project, MilestoneRepository $milestoneRepository)
    {
        $milestones = $milestoneRepository->findBy(['project' => $project]);

        return $this->render('Milestone/index.html.twig' , array(
            'project' => $project,
            'milestones' => $milestones
        ));
    }

    public function createAction(Request $request, Project $project)
    {
        $milestone = (new Milestone())
            ->setProject($project)
        ;
        $form = $this->createForm(new MilestoneType(), $milestone);

        if ($form->handleRequest($request)->isValid()) {

            $this->get(DomainManager::class)->create($milestone);

            $this->addFlash('notice', 'Milestone created!');

            return $this->redirect($this->generateUrl('milestone_show', ['slug' => $milestone->getSlug()]));
        }

        return $this->render('Milestone/create.html.twig', [
            'project' => $project,
            'form' => $form->createView()
        ]);
    }
}
