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
        $key = $this->getDoctrine()->getManager()->getRepository('GitcolabAppBundle:Key')->find($key);

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
                $this->getDoctrine()->getManager()->persist($key);
                $this->getDoctrine()->getManager()->flush();
            }

            $this->get('session')->getFlashBag()->add(
                'notice',
                'SSH key created!'
            );

            return $this->redirect($this->generateUrl('user_keys'));
        }

        $view = $this->view(array('form' => $form->createView() ), 200)
            ->setTemplate("GitcolabAppBundle:Key:create.html.twig")
        ;

        return $this->handleView($view);
    }

    public function deleteAction()
    {

    }
}