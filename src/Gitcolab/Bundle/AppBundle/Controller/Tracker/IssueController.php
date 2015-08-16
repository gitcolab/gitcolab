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
use Gitcolab\Bundle\AppBundle\Form\Type\IssueType;
use Gitcolab\Bundle\AppBundle\Model\Project;
use Gitcolab\Bundle\AppBundle\Model\Tracker\Issue;
use Symfony\Component\HttpFoundation\Request;

class IssueController extends Controller
{
    public function listAction(Project $project)
    {
        $issues  = $this->get('gitcolab.repository.issue')->findBy(array('project' => $project));
        $milestones = $this->getRepository('Tracker\Milestone')->findBy(['project' => $project]);

        return $this->render('@GitcolabApp/Issue/index.html.twig', [
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
            $this->get('gitcolab.domain_manager')->create($issue);

            return $this->redirectToRoute('issue_show',[
                'project' => $project,
                'slug' => $project->getSlug(),
                'id' => $issue->getId()
            ]);
        }

        return $this->render('@GitcolabApp/Issue/create.html.twig', [
            'project' => $project,
            'form' => $form->createView()
        ]);
    }

    public function showAction(Request $request, Issue $issue)
    {
        $project = $this->get('gitcolab.repository.project')->findOneBy(array('slug' => $request->get('slug')));

        return $this->render('@GitcolabApp/Issue/show.html.twig', [
            'project' => $project,
            'issue' => $issue,
            'comments' => []
        ]);
    }
}