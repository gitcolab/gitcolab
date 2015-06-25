<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Controller\Project;

use Symfony\Component\HttpFoundation\Request;
use Gitcolab\Bundle\AppBundle\Controller\ProjectController;

class SettingsController extends ProjectController
{
    public function settingsAction(Request $request, $slug)
    {
        $project = $this->getProject($slug);

        return $this->render('@GitcolabApp/Project/Settings/Settings.html.twig', ['project' => $project]);
    }


    public function collaborationAction(Request $request, $repository)
    {
        $project = $this->getProject($repository);

        if ($request->request->has('team')) {
            $team = $this->get('gitcolab.repository.team')->find($request->request->get('team'));

            if ($project->getTeams()->contains($team)) {
                $project->addTeam($team);
                $this->get('gitcolab.domain_manager')->update($project);
                $this->addFlash('success', 'Team has been added');
            }
        }

        if ($request->query->has('delete')) {
            $team = $this->get('gitcolab.repository.team')->find($request->query->get('delete'));
            $project->getTeams()->removeElement($team);

            $this->get('gitcolab.domain_manager')->update($project);
            $this->addFlash('success', 'Team has been removed');
        }

        return $this->render('@GitcolabApp/Project/Settings/collaboration.html.twig', ['project' => $project]);
    }
}