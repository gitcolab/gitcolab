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
use Gitcolab\Bundle\AppBundle\Model\Project;

class ShellCommand extends ContainerAwareCommand
{
    /**
     * @inheritdoc
     */
    protected function configure()
    {
        $this
            ->setName('gitcolab:git:shell')
            ->addArgument('key', InputArgument::REQUIRED, 'Authenticated user')
        ;
    }

    /**
     * @inheritdoc
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $container = $this->getContainer();
        $key = $container->get('gitcolab.repository.key')->find($input->getArgument('key'));

        if (null === $key) {
            return;
        }

        $originalCommand =  isset($_SERVER['SSH_ORIGINAL_COMMAND']) ? $_SERVER['SSH_ORIGINAL_COMMAND'] : null;

        if (null === $originalCommand) {
            return $this->outputUserInformation($output, $key->getUser());
        }

        if (!preg_match("#([\w-]+) '(".Project::SLUG_PATTERN.").git'#", $originalCommand, $vars)) {
            throw new \RuntimeException('Command seems illegal: '.$originalCommand);
        }
        $action = $vars[1];
        $project = $this->getProject($vars[2]);
        switch ($action) {
            case 'git-receive-pack':
            case 'git-upload-pack':
                break;
            default:
                throw new \RuntimeException('Action seems illegal: '.$action);
        }

        $project->getRepository()->shell($action, array());
    }

    protected function outputUserInformation(OutputInterface $output, $user)
    {
        $output->writeln("");
        $output->writeln("Hi ".$user->getUsername()."! You've successfully authenticated, but Gitcolab does not provide shell access.");
        $output->writeln("");

    }

    protected function getProject($slug)
    {
        $project = $this->getContainer()->get('gitcolab.repository.project')->findOneBySlug($slug);

        if (!$project) {
            throw new \RuntimeException(sprintf('No project with slug "%s" found', $slug));
        }
        return $project;
    }
}