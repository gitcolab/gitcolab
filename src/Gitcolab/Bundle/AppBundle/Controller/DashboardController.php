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

use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    public function mainAction()
    {
        $organizations = $this->getRepository('Organization')->findOrganizationsByUser($this->getUser()->getId());
        $view = $this
            ->view(array(
                'organizations' => $organizations,
            ))
            ->setStatusCode(200)
            ->setTemplate("GitcolabAppBundle:Dashboard:main.html.twig");

        return $this->handleView($view);
    }
}