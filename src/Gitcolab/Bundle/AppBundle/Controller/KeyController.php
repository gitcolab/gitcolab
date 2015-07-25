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
    public function sshAction()
    {
        $keys = $this->getRepository('Key')
            ->findAll(array('user' =>$this->getuser()));

        $view = $this->view($keys, 200)
            ->setTemplate("GitcolabAppBundle:Key:ssh.html.twig")
            ->setTemplateVar('keys')
        ;

        return $this->handleView($view);
    }

    public function discoverAction($key)
    {
        $key = $this->getRepository('Key')->find($key);

        $view = View::create();
        $view->setData($key);

        return $view;
    }

    public function createAction(Request $request)
    {
        $authorizedKeys = $_SERVER['HOME'].'/.ssh/authorized_keys';
        $command = $this->container->getParameter('gitcolab.git.shell_command');

        $key = new Key();
        $key->setUser($this->getUser());
        $form = $this->createForm(new KeyType(), $key);

        if ($form->handleRequest($request)->isValid()) {
                //@todo check ssh key is valid
                $this->get('gitcolab.domain_manager')->create($key);
                $outputd = sprintf(
                    "command=\"%s %s\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty %s\n",
                    $command, $key->getId(), $key->getKey()
                );
                file_put_contents($authorizedKeys, $outputd, FILE_APPEND);

            $this->addFlash('notice', 'SSH key created!');

            return $this->redirectToRoute('user_keys');
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