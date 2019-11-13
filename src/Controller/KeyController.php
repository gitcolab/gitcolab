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
use Gitcolab\Form\Type\KeyType;
use Gitcolab\Model\Key;
use Gitcolab\Repository\KeyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class KeyController extends AbstractController
{
    public function sshAction(KeyRepository $keyRepository)
    {
        $keys = $keyRepository->find(['user' => $this->getUser()]);

        return $this->render('Key/ssh.html.twig', ['keys' => $keys]);
    }

    public function discoverAction($key)
    {
        $key = $this->getRepository('Key')->find($key);

        return $this->render(null, $key);
    }

    public function createAction(Request $request)
    {
        $authorizedKeys = $request->server->get('HOME').'/.ssh/authorized_keys';
        $command = $this->container->getParameter('gitcolab.git.shell_command');

        $key = (new Key())
            ->setUser($this->getUser());
        $form = $this->createForm(KeyType::class, $key);

        if ($form->handleRequest($request)->isValid()) {
            //@todo check ssh key is valid
            $this->get(DomainManager::class)->create($key);
            $output = sprintf(
                    "command=\"%s %s\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty %s\n",
                    $command, $key->getId(), $key->getKey()
                );
            file_put_contents($authorizedKeys, $output, FILE_APPEND);

            $this->addFlash('notice', 'SSH key created!');

            return $this->redirectToRoute('user_keys');
        }

        return $this->render('Key/create.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    public function deleteAction(Key $key)
    {
        if ($key->getUser() === $this->getUser()) {
            $this->get(DomainManager::class)->delete($key);
            $this->addFlash('success', 'SSH key removed');

            return $this->redirectToRoute('user_keys');
        }

        throw $this->createAccessDeniedException();
    }
}
