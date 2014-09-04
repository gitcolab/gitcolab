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

use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\View\View;
use Gitcolab\Bundle\AppBundle\Form\Type\OrganizationType;
use Gitcolab\Bundle\AppBundle\Model\Organization;

class OrganizationController extends Controller
{
    public function createAction(Request $request)
    {
        $organization = (new Organization())
            ->addUser($this->getUser(), 'ROLE_ADMIN');
        $form = $this->createForm(new OrganizationType, $organization);

        if ($form->handleRequest($request)->isValid()) {
            $this->persistAndFlush($organization);

            $this->redirect($this->generateUrl('_welcome'));
        }

        $view = View::create();
        $view->setData(array(
            'form' => $form->createView()
        ));
        $view->setTemplate('GitcolabAppBundle:Organization:create.html.twig');

        return $this->handleView($view);
    }
}