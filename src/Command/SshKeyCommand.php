<?php

/**
 * This file is part of Gitcolab.
 *
 * (c) Mbechezi mlanawo <mlanawo.mbechezi@kemeter.io>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Gitcolab\Command;

use Symfony\Component\Console\Command\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class SshKeyCommand extends Command
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

        $authorizedKeys = $_SERVER['HOME'].'/.ssh/authorized_keys';
        $repository = $this->getContainer()->get('gitcolab.repository.key');

        $keys = $repository->findAll();
        $outputd = '';

        foreach ($keys as $key) {
            $outputd .= sprintf("command=\"%s %s\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty %s\n",
                $command, $key->getId(), $key->getKey()
            );
        }

        file_put_contents($authorizedKeys, $outputd);
        $this->getContainer()->get('logger')->info(sprintf('Update %s', $authorizedKeys));
    }
}
