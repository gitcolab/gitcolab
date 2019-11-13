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

use Gitcolab\Model\Project;
use Gitcolab\Repository\KeyRepository;
use Gitcolab\Repository\ProjectRepository;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ShellCommand extends Command
{
    /** @var ProjectRepository */
    private $projectRepository;

    /** @var KeyRepository */
    private $keyRepository;

    /** @var LoggerInterface */
    private $logger;

    public function __construct(
        ProjectRepository $projectRepository,
        KeyRepository $keyRepository,
        LoggerInterface $logger)
    {
        $this->logger = $logger;
        $this->keyRepository = $keyRepository;
        $this->projectRepository = $projectRepository;

        parent::__construct('');
    }

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('gitcolab:git:shell')
            ->addArgument('key', InputArgument::REQUIRED, 'Authenticated user')
        ;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $key = $this->keyRepository->find($input->getArgument('key'));

        if (null === $key) {
            return;
        }

        $originalCommand = $_SERVER['SSH_ORIGINAL_COMMAND'] ?? null;

        if (null === $originalCommand) {
            return $this->outputUserInformation($output, $key->getUser());
        }

        if (!preg_match("#([\w-]+) '(".Project::SLUG_PATTERN.").git'#", $originalCommand, $vars)) {
            throw new \RuntimeException('Command seems illegal: '.$originalCommand);
        }
        $action = $vars[1];
        $this->logger->info($action);

        $project = $this->getProject($vars[2]);
        switch ($action) {
            case 'git-receive-pack':
            case 'git-upload-pack':
                break;
            default:
                throw new \RuntimeException('Action seems illegal: '.$action);
        }

        $project->getRepository()->shell($action, []);
    }

    protected function outputUserInformation(OutputInterface $output, $user)
    {
        $output->writeln('');
        $output->writeln('Hi '.$user->getUsername()."! You've successfully authenticated, but Gitcolab does not provide shell access.");
        $output->writeln('');
    }

    protected function getProject(string $slug)
    {
        $project = $this->projectRepository->findOneBySlug($slug);

        if (!$project) {
            throw new \RuntimeException(sprintf('No project with slug "%s" found', $slug));
        }

        return $project;
    }
}
