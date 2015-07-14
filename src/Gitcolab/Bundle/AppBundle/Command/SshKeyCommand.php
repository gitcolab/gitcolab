<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo@mbechezi.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Bundle\AppBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class SshKeyCommand extends ContainerAwareCommand
{
    /**
     * @inheritdoc
     */
    protected function configure()
    {
        $this
            ->setName('gitcolab:generate:keys');
    }

    /**
     * @inheritdoc
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $command = $this->getContainer()->getParameter('gitcolab.git.shell_command');

        $candidate = $_SERVER['HOME'].'/.ssh/authorized_keys';
        $repository = $this->getContainer()->get('gitcolab.repository.key');

        $keys = $repository->findAll();
        $outputd = '';

        foreach ($keys as $row) {
            $outputd .= sprintf("command=\"%s %s\" ,no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ssh-rsa %s\n",
                $command, $row->getId(), $row->getKey()
            );
        }

        file_put_contents($candidate, $outputd);

        echo $outputd;

    }
}