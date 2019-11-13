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
use Gitcolab\Model\Team;
use Gitcolab\Repository\AccessRepository;
use Gitcolab\Repository\OrganizationRepository;
use Gitcolab\Repository\TeamRepository;
use Gitcolab\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class TeamController extends AbstractController
{
    /** @var UserRepository */
    private $accessRepository;

    /** @var UserRepository */
    private $teamRepository;

    /** @var AccessRepository */
    private $userRepository;
    /**
     * @var DomainManager
     */
    private $domainManager;

    public function __construct(
        UserRepository $userRepository,
        AccessRepository $accessRepository,
        TeamRepository $teamRepository,
        DomainManager $domainManager
    ) {
        $this->userRepository = $userRepository;
        $this->teamRepository = $teamRepository;
        $this->accessRepository = $accessRepository;
        $this->domainManager = $domainManager;
    }

    public function createAction(Request $request, OrganizationRepository $organizationRepository, string $slug)
    {
        $organization = $organizationRepository->findOneBy(['slug' => $slug]);

        if ($organization) {
            throw new NotFoundHttpException();
        }

        $organization->setLastActivity(new \DateTime());

        return (new Team())
            ->setOrganization($organization);
    }

    public function addMemberAction(Request $request, string $slug)
    {
        $user = $this->userRepository->find($slug);
        /** @var Team $team */
        $team = $this->teamRepository->find($request->get('id'));
        $team->setAccess($user);

        if (false === $team->hasMember($user)) {
            $access = (new Access())
                ->setResource($team)
                ->setAccess($user);

            $this->domainManager->create($access);
            $this->addFlash('success', 'gitcolab.team.success_add');
        } else {
            $this->addFlash('error', 'gitcolab.team.already_exist');
        }

        return $this->redirectToRoute('organization_team_show', [
            'organization' => $team->getOrganization(),
            'slug' => $team->getSlug(),
        ]);
    }

    public function removeMemberAction(Request $request)
    {
        $user = $this->userRepository->find($request->get('member'));
        $team = $this->findOr404($request);

        $access = $this->accessRepository->findOneBy([
            'user' => $user,
            'team' => $team,
        ]);

        if (!$access) {
            throw $this->createNotFoundException();
        }

        $this->domainManager->delete($access);

        return $this->redirectToRoute('organization_team_show', [
            'organization' => $team->getOrganization(),
            'slug' => $team->getSlug(),
        ]);
    }
}
