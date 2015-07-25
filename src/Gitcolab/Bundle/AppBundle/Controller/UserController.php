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
use Gitcolab\Bundle\AppBundle\Form\Type\ProfileType;

class UserController extends Controller
{
    public function profileAction(Request $request)
    {
        $profile = $this->getUser();
        $form = $this->createForm(new ProfileType(), $profile);

        if ($form->handleRequest($request)->isValid()) {
            $this->persistAndFlush($profile);
        }

        return $this->render('GitcolabAppBundle:User:profile.html.twig', array(
            'form' => $form->createView()
        ));
    }

    public function accountAction()
    {
        return $this->render('GitcolabAppBundle:User:account.html.twig');
    }

    public function showAction()
    {
        $repositories = $this->getRepository('Project')->findBy(array(
            'owner' => $this->getUser()
        ));

        return $this->render('GitcolabAppBundle:User:show.html.twig', array(
            'user' => $this->getUser(),
            'repositories' => $repositories
        ));
    }

    public function autocompleteAction(Request $request)
    {
        $users = $this->get('gitcolab.repository.user')->findAll();

        return $this->handleView($this->view(['data' => $users], 200));
    }
}