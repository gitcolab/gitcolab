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

use Gitcolab\DomainManager;
use Gitcolab\Model\Access;
use Gitcolab\Repository\OrganizationRepository;
use Gitcolab\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Gitcolab\Model\Team;

class TeamController extends AbstractController
{
    public function cre(OrganizationRepository $organizationRepository)
    {
        $request = $this->get('request_stack')->getCurrentRequest();
        $organization = $organizationRepository->findOneBy(['slug' => $request->get('slug')]);

        $organization->setLastActivity(new \DateTime());
        $team = (new Team())
            ->setOrganization($organization);

        return $team;
    }

    public function addMemberAction(Request $request, UserRepository $userRepository)
    {
        $user = $userRepository->find($request->get('member'));
        /** @var Team $team */
        $team = $this->findOr404($request);
        $team->setAccess($user);

        if (false === $team->hasMember($user)) {
            $access = (new Access())
                ->setResource($team)
                ->setAccess($user);

            $this->get(DomainManager::class)->create($access);
            $this->addFlash('success', 'gitcolab.team.success_add');

        } else {
            $this->addFlash('error', 'gitcolab.team.already_exist');
        }

        return $this->redirectToRoute('organization_team_show', [
            'organization' => $team->getOrganization(),
            'slug' => $team->getSlug()
        ]);
    }

    public function removeMemberAction(Request $request)
    {
        $user = $this->get('gitcolab.repository.user')->find($request->get('member'));
        $team = $this->findOr404($request);

        $access = $this->get('gitcolab.repository.access')->findOneBy([
            'user' => $user,
            'team' => $team
        ]);

        if (!$access) {
            throw $this->createNotFoundException();
        }

        $this->get(DomainManager::class)->delete($access);

        return $this->redirectToRoute('organization_team_show', [
            'organization' => $team->getOrganization(),
            'slug' => $team->getSlug()
        ]);
    }
}
