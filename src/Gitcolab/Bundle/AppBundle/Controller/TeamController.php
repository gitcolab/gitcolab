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

use Gitcolab\Bundle\AppBundle\Model\Access;
use Symfony\Component\HttpFoundation\Request;
use Sylius\Bundle\ResourceBundle\Controller\ResourceController;
use Gitcolab\Bundle\AppBundle\Model\Team;

class TeamController extends ResourceController
{
    public function createNew()
    {
        $request = $this->get('request_stack')->getCurrentRequest();
        $organization = $this->get('gitcolab.repository.organization')->findOneBy(['slug' => $request->get('slug')]);

        $organization->setLastActivity(new \DateTime());
        $team = (new Team())
            ->setOrganization($organization);

        return $team;
    }

    public function addMemberAction(Request $request)
    {
        $user = $this->get('gitcolab.repository.user')->find($request->get('member'));
        /** @var Team $team */
        $team = $this->findOr404($request);
        $team->setAccess($user);

        $access = (new Access())
            ->setResource($team)
            ->setUser($user);

        $this->domainManager->create($access);
        //$this->domainManager->update($team);

        return $this->redirectToRoute('organization_team_show', [
            'organization' => $team->getOrganization(),
            'slug' => $team->getSlug()
        ]);
    }
}