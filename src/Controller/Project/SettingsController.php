<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Controller\Project;

use Gitcolab\DomainManager;
use Gitcolab\Repository\TeamRepository;
use Symfony\Component\HttpFoundation\Request;
use Gitcolab\Controller\ProjectController;

class SettingsController extends ProjectController
{
    public function settingsAction(Request $request, $slug)
    {
        $project = $this->getProject($slug);

        return $this->render('Project/Settings/Settings.html.twig', ['project' => $project]);
    }

    public function collaborationAction(Request $request, $repository, TeamRepository $teamRepository)
    {
        $project = $this->getProject($repository);

        if ($request->request->has('team')) {
            $team = $teamRepository->find($request->request->get('team'));

            if ($project->getTeams()->contains($team)) {
                $project->addTeam($team);
                $this->get(DomainManager::class)->update($project);
                $this->addFlash('success', 'Team has been added');
            }
        }

        if ($request->query->has('delete')) {
            $team = $teamRepository->find($request->query->get('delete'));
            $project->getTeams()->removeElement($team);

            $this->get(DomainManager::class)->update($project);
            $this->addFlash('success', 'Team has been removed');
        }

        return $this->render('Project/Settings/collaboration.html.twig', ['project' => $project]);
    }
}
