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
use Gitcolab\Bundle\AppBundle\Model\Key;
use Gitcolab\Bundle\AppBundle\Form\Type\KeyType;


class KeyController extends Controller
{
    public function discoverAction($key)
    {
        $key = $this->getRepository('Key')->find($key);

        $view = View::create();
        $view->setData($key);

        return $view;
    }

    public function createAction(Request $request)
    {
        $key = new Key();
        $key->setUser($this->getUser());
        $form = $this->createForm(new KeyType(), $key);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if( $form->isValid()) {

                //todo check ssh key is valid
                $this->get('gitcolab.domain_manager')->create($key);
            }

            $this->get('session')->getFlashBag()->add(
                'notice',
                'SSH key created!'
            );

            return $this->redirect($this->generateUrl('user_keys'));
        }

        return $this->render('GitcolabAppBundle:Key:create.html.twig' , array(
            'form' => $form->createView()
        ));
    }

    public function deleteAction(Key $key)
    {

        if ($key->getUser() == $this->getUser()) {
            $this->get('gitcolab.domain_manager')->delete($key);
            $this->addFlash('success', 'SSH key removed');

            return $this->redirectToRoute('user_keys');
        }

        throw $this->createAccessDeniedException();
    }
}