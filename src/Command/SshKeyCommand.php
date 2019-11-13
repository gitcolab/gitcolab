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

use Gitcolab\Repository\KeyRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SshKeyCommand extends Command
{
    private $logger;
    private $keyRepository;
    private $gitShellCommand;

    public function __construct(string $gitShellCommand, KeyRepository $keyRepository, LoggerInterface $logger)
    {
        $this->gitShellCommand = $gitShellCommand;
        $this->keyRepository = $keyRepository;
        $this->logger = $logger;

        parent::__construct('');
    }

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('gitcolab:generate:keys');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $authorizedKeys = $_SERVER['HOME'].'/.ssh/authorized_keys';

        $keys = $this->keyRepository->findAll();
        $line = '';

        foreach ($keys as $key) {
            $line .= sprintf("command=\"%s %s\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty %s\n",
                $this->gitShellCommand, $key->getId(), $key->getKey()
            );
        }

        file_put_contents($authorizedKeys, $line);

        $this->logger->info(sprintf('Update %s', $authorizedKeys));
    }
}
