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
use Gitcolab\Form\Type\ProfileType;
use Gitcolab\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class UserController extends AbstractController
{
    public function profileAction(Request $request)
    {
        $profile = $this->getUser();
        $form = $this->createForm(ProfileType::class, $profile);

        if ($form->isSubmitted() && $form->handleRequest($request)->isValid()) {
            $this->get(DomainManager::class)->update($profile);
        }

        return $this->render('User/profile.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function accountAction()
    {
        return $this->render('User/account.html.twig');
    }

    public function showAction()
    {
        $repositories = $this->getRepository('Project')->findBy([
            'owner' => $this->getUser(),
        ]);

        return $this->render('User/show.html.twig', [
            'user' => $this->getUser(),
            'repositories' => $repositories,
        ]);
    }

    public function autocompleteAction(Request $request, UserRepository $userRepository)
    {
        $users = $this->get($userRepository)->findAll();

        return $this->render(null, ['data' => $users]);
    }
}
