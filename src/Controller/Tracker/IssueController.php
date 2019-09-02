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
use Gitcolab\Form\Type\IssueType;
use Gitcolab\Model\Project;
use Gitcolab\Model\Tracker\Issue;
use Gitcolab\Repository\MilestoneRepository;
use Gitcolab\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class IssueController extends AbstractController
{
    public function listAction(Project $project, ProjectRepository $projectRepository, MilestoneRepository $milestoneRepository)
    {
        $issues = $projectRepository->findBy(array('project' => $project));
        $milestones = $milestoneRepository->findBy(['project' => $project]);

        return $this->render('Issue/index.html.twig', [
            'issues' => $issues,
            'project' => $project,
            'milestones' => $milestones,
        ]);
    }

    public function createAction(Request $request, Project $project)
    {
        $issue = (new Issue())
            ->setAuthor($this->getUser())
            ->setProject($project);

        $form = $this->createForm(new IssueType(), $issue);

        if ($form->handleRequest($request)->isValid()) {
            $this->get(DomainManager::class)->create($issue);

            return $this->redirectToRoute('issue_show',[
                'project' => $project,
                'slug' => $project->getSlug(),
                'id' => $issue->getId()
            ]);
        }

        return $this->render('Issue/create.html.twig', [
            'project' => $project,
            'form' => $form->createView()
        ]);
    }

    public function showAction(Request $request, ProjectRepository $projectRepository, Issue $issue)
    {
        $project = $projectRepository->findOneBy(array('slug' => $request->get('slug')));

        return $this->render('Issue/show.html.twig', [
            'project' => $project,
            'issue' => $issue,
            'comments' => []
        ]);
    }
}
